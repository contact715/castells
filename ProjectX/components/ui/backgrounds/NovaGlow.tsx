"use client";

import React, { useEffect, useRef, memo } from "react";

interface NovaGlowProps {
    className?: string;
    hue?: number;
    intensity?: number; // 0 to 1, drives the distortion/glow
    style?: React.CSSProperties;
}

const vertexShaderSource = `#version 300 es
    precision highp float;
    layout(location = 0) in vec2 position;
    layout(location = 1) in vec2 uv;
    out vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
    }
`;

const fragmentShaderSource = `#version 300 es
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float intensity; // Driven by audio volume/equalizer

    in vec2 vUv;
    out vec4 fragColor;

    vec3 rgb2yiq(vec3 c) {
        float y = dot(c, vec3(0.299, 0.587, 0.114));
        float i = dot(c, vec3(0.596, -0.274, -0.322));
        float q = dot(c, vec3(0.211, -0.523, 0.312));
        return vec3(y, i, q);
    }
    
    vec3 yiq2rgb(vec3 c) {
        float r = c.x + 0.956 * c.y + 0.621 * c.z;
        float g = c.x - 0.272 * c.y - 0.647 * c.z;
        float b = c.x - 1.106 * c.y + 1.703 * c.z;
        return vec3(r, g, b);
    }
    
    vec3 adjustHue(vec3 color, float hueDeg) {
        float hueRad = hueDeg * 3.14159265 / 180.0;
        vec3 yiq = rgb2yiq(color);
        float cosA = cos(hueRad);
        float sinA = sin(hueRad);
        float i = yiq.y * cosA - yiq.z * sinA;
        float q = yiq.y * sinA + yiq.z * cosA;
        yiq.y = i;
        yiq.z = q;
        return yiq2rgb(yiq);
    }

    vec3 hash33(vec3 p3) {
        p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
        p3 += dot(p3, p3.yxz + 19.19);
        return -1.0 + 2.0 * fract(vec3(
            p3.x + p3.y,
            p3.x + p3.z,
            p3.y + p3.z
        ) * p3.zyx);
    }

    float snoise3(vec3 p) {
        const float K1 = 0.333333333;
        const float K2 = 0.166666667;
        vec3 i = floor(p + (p.x + p.y + p.z) * K1);
        vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
        vec3 e = step(vec3(0.0), d0 - d0.yzx);
        vec3 i1 = e * (1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy * (1.0 - e);
        vec3 d1 = d0 - (i1 - K2);
        vec3 d2 = d0 - (i2 - K1);
        vec3 d3 = d0 - 0.5;
        vec4 h = max(0.6 - vec4(
            dot(d0, d0),
            dot(d1, d1),
            dot(d2, d2),
            dot(d3, d3)
        ), 0.0);
        vec4 n = h * h * h * h * vec4(
            dot(d0, hash33(i)),
            dot(d1, hash33(i + i1)),
            dot(d2, hash33(i + i2)),
            dot(d3, hash33(i + 1.0))
        );
        return dot(vec4(31.316), n);
    }

    const vec3 baseColor1 = vec3(0.61, 0.26, 0.99); // Purple
    const vec3 baseColor2 = vec3(0.30, 0.76, 0.91); // Blue
    const vec3 baseColor3 = vec3(0.06, 0.08, 0.60); // Deep Blue

    void main() {
        vec2 uv = (vUv - 0.5) * 2.0;
        float aspect = iResolution.x / iResolution.y;
        uv.x *= aspect;

        float dist = length(uv);
        
        // Base radius is 0.5, distorted by noise and intensity
        float noise = snoise3(vec3(uv * 1.5, iTime * 0.5));
        float radius = 0.4 + (noise * 0.15 * (1.0 + intensity * 2.0));
        
        float alpha = smoothstep(radius + 0.1, radius, dist) * smoothstep(radius - 0.2, radius, dist);
        
        // Core glow
        float core = smoothstep(radius, 0.0, dist);
        
        // Color mix based on angle and time
        float angle = atan(uv.y, uv.x) + iTime * 0.2;
        vec3 color = mix(baseColor1, baseColor2, 0.5 + 0.5 * sin(angle));
        color = mix(color, baseColor3, core * 0.5);
        
        // Intensity drives brightness and saturation
        color = adjustHue(color, hue);
        color *= (1.0 + intensity * 1.5);
        
        // Rim highlight
        float rim = pow(1.0 - abs(dist - radius) / 0.2, 8.0);
        color += baseColor2 * rim * (0.5 + intensity);

        fragColor = vec4(color, alpha * 0.8 * (0.3 + intensity * 0.7));
    }
`;

export const NovaGlow = memo(function NovaGlow({ className, hue = 0, intensity = 0, style }: NovaGlowProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glRef = useRef<WebGL2RenderingContext | null>(null);
    const programRef = useRef<WebGLProgram | null>(null);
    const startTimeRef = useRef<number>(Date.now());
    const rafRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl2", { alpha: true, antialias: true });
        if (!gl) return;
        glRef.current = gl;

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        programRef.current = program;

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);

        const render = () => {
            if (!gl || !program) return;

            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                gl.viewport(0, 0, width, height);
            }

            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(program);

            const iTimeLoc = gl.getUniformLocation(program, "iTime");
            gl.uniform1f(iTimeLoc, (Date.now() - startTimeRef.current) / 1000);

            const iResLoc = gl.getUniformLocation(program, "iResolution");
            gl.uniform3f(iResLoc, canvas.width, canvas.height, 1.0);

            const hueLoc = gl.getUniformLocation(program, "hue");
            gl.uniform1f(hueLoc, hue);

            const intensityLoc = gl.getUniformLocation(program, "intensity");
            gl.uniform1f(intensityLoc, intensity);

            const posLoc = gl.getAttribLocation(program, "position");
            gl.enableVertexAttribArray(posLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

            const uvLoc = gl.getAttribLocation(program, "uv");
            gl.enableVertexAttribArray(uvLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
            gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            rafRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            gl.deleteProgram(program);
        };
    }, []);

    // We only update intensity/hue uniforms without re-creating the program
    // but the current implementation re-renders via RAF which is fine.

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                width: '100%',
                height: '100%',
                display: 'block',
                ...style
            }}
        />
    );
});
