"use client";

import React, { useEffect, useRef, useMemo, useState, memo } from "react";
import { motion, useInView, cubicBezier } from "framer-motion";

// --- Types ---
export type LiquidVariant = "Prism" | "Lava" | "Plasma" | "Pulse" | "Vortex" | "Mist";

interface LiquidBackgroundProps {
    variant?: LiquidVariant | string;
}

// --- Constants & Templates ---
const PatternShapes = { Checks: 0, Stripes: 1, Edge: 2 };

const speedEase = cubicBezier(0.65, 0, 0.88, 0.77);

const templates: Record<string, any> = {
    Prism: { color1: "#050505", color2: "#66B3FF", color3: "#FFFFFF", rotation: -50, proportion: 1, scale: 0.01, speed: 30, distortion: 0, swirl: 50, swirlIterations: 16, softness: 47, offset: -299, shape: "Checks", shapeSize: 45 },
    Lava: { color1: "#FF9F21", color2: "#FF0303", color3: "#000000", rotation: 114, proportion: 100, scale: 0.52, speed: 30, distortion: 7, swirl: 18, swirlIterations: 20, softness: 100, offset: 717, shape: "Edge", shapeSize: 12 },
    Plasma: { color1: "#B566FF", color2: "#000000", color3: "#000000", rotation: 0, proportion: 63, scale: 0.75, speed: 30, distortion: 5, swirl: 61, swirlIterations: 5, softness: 100, offset: -168, shape: "Checks", shapeSize: 28 },
    Pulse: { color1: "#66FF85", color2: "#000000", color3: "#000000", rotation: -167, proportion: 92, scale: 0, speed: 20, distortion: 54, swirl: 75, swirlIterations: 3, softness: 28, offset: -813, shape: "Checks", shapeSize: 79 },
    Vortex: { color1: "#000000", color2: "#FFFFFF", color3: "#000000", rotation: 50, proportion: 41, scale: 0.4, speed: 20, distortion: 0, swirl: 100, swirlIterations: 3, softness: 5, offset: -744, shape: "Stripes", shapeSize: 80 },
    Mist: { color1: "#050505", color2: "#FF66B8", color3: "#050505", rotation: 0, proportion: 33, scale: 0.48, speed: 39, distortion: 4, swirl: 65, swirlIterations: 5, softness: 100, offset: -235, shape: "Edge", shapeSize: 48 }
};

// --- Shader Source ---
const vertexShaderSource = `#version 300 es
layout(location = 0) in vec4 a_position;
void main() {
  gl_Position = a_position;
}`;

const warpFragmentShader = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define PI 3.14159265358979323846
#define TWO_PI 6.28318530717958647692

vec2 rotate(vec2 uv, float th) {
  float c = cos(th);
  float s = sin(th);
  return mat2(c, s, -s, c) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float t = .5 * u_time;
    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = min(ceil(u_swirlIterations), 20.0);
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);
    float mixer = 0.;
    
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      float shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      float shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      float shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);
    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

// --- Utility Functions ---
function getShaderColorFromString(colorString: string | number[], fallback = [0, 0, 0, 1]): number[] {
    if (Array.isArray(colorString)) {
        if (colorString.length === 4) return colorString;
        if (colorString.length === 3) return [...colorString, 1];
        return fallback;
    }
    if (typeof colorString !== "string") return fallback;

    let r = 0, g = 0, b = 0, a = 1;
    colorString = colorString.trim();

    if (colorString.startsWith("#")) {
        const hex = colorString.replace(/^#/, "");
        const expand = hex.length === 3 ? hex.split("").map(c => c + c).join("") : hex;
        const fullHex = expand.length === 6 ? expand + "ff" : expand;
        r = parseInt(fullHex.slice(0, 2), 16) / 255;
        g = parseInt(fullHex.slice(2, 4), 16) / 255;
        b = parseInt(fullHex.slice(4, 6), 16) / 255;
        a = parseInt(fullHex.slice(6, 8), 16) / 255;
        return [r, g, b, a];
    } else if (colorString.startsWith("rgb")) {
        const match = colorString.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)/i);
        if (match) {
            return [parseInt(match[1]) / 255, parseInt(match[2]) / 255, parseInt(match[3]) / 255, match[4] ? parseFloat(match[4]) : 1];
        }
    }
    return fallback;
}

// --- ShaderMount Component ---
class ShaderMountVanilla {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    program: WebGLProgram | null = null;
    uniformLocations: Record<string, WebGLUniformLocation | null> = {};
    fragmentShader: string;
    rafId: number | null = null;
    lastFrameTime: number = 0;
    totalAnimationTime: number = 0;
    speed: number = 1;
    providedUniforms: Record<string, any>;
    hasBeenDisposed: boolean = false;
    resolutionChanged: boolean = true;
    resizeObserver: ResizeObserver | null = null;
    // OPTIMIZATION: Internal DPR for lower resolution rendering (blurry effect hides it)
    internalDPR: number = Math.min(window.devicePixelRatio || 1, 0.5);

    constructor(canvas: HTMLCanvasElement, fragmentShader: string, uniforms: Record<string, any> = {}, speed = 1, seed = 0) {
        this.canvas = canvas;
        this.fragmentShader = fragmentShader;
        this.providedUniforms = uniforms;
        this.speed = speed;
        this.totalAnimationTime = seed;

        // OPTIMIZATION: Better performance config
        const gl = canvas.getContext("webgl2", {
            preserveDrawingBuffer: false,
            alpha: true,
            antialias: false,
            powerPreference: "high-performance",
            depth: false,
            stencil: false
        });
        if (!gl) throw new Error("WebGL2 not supported");
        this.gl = gl;

        this.initWebGL();
        this.setupResizeObserver();
        this.setSpeed(speed);
    }

    initWebGL = () => {
        const program = this.createProgram(this.gl, vertexShaderSource, this.fragmentShader);
        if (!program) return;
        this.program = program;
        this.setupPositionAttribute();
        this.setupUniforms();
    };

    createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };

    createProgram = (gl: WebGL2RenderingContext, vSource: string, fSource: string) => {
        const vs = this.createShader(gl, gl.VERTEX_SHADER, vSource);
        const fs = this.createShader(gl, gl.FRAGMENT_SHADER, fSource);
        if (!vs || !fs) return null;
        const program = gl.createProgram();
        if (!program) return null;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            return null;
        }
        return program;
    };

    setupPositionAttribute = () => {
        const loc = this.gl.getAttribLocation(this.program!, "a_position");
        const buf = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buf);
        const pos = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(pos), this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(loc);
        this.gl.vertexAttribPointer(loc, 2, this.gl.FLOAT, false, 0, 0);
    };

    setupUniforms = () => {
        this.uniformLocations = {
            u_time: this.gl.getUniformLocation(this.program!, "u_time"),
            u_pixelRatio: this.gl.getUniformLocation(this.program!, "u_pixelRatio"),
            u_resolution: this.gl.getUniformLocation(this.program!, "u_resolution"),
        };
        Object.keys(this.providedUniforms).forEach(key => {
            this.uniformLocations[key] = this.gl.getUniformLocation(this.program!, key);
        });
    };

    setupResizeObserver = () => {
        this.resizeObserver = new ResizeObserver(() => this.handleResize());
        this.resizeObserver.observe(this.canvas);
        this.handleResize();
    };

    handleResize = () => {
        const dpr = this.internalDPR;
        const w = Math.floor(this.canvas.clientWidth * dpr);
        const h = Math.floor(this.canvas.clientHeight * dpr);
        if (this.canvas.width !== w || this.canvas.height !== h) {
            this.canvas.width = w;
            this.canvas.height = h;
            this.resolutionChanged = true;
            this.gl.viewport(0, 0, w, h);
            this.render(performance.now());
        }
    };

    render = (now: number) => {
        if (this.hasBeenDisposed || this.speed === 0) return;
        const dt = now - this.lastFrameTime;
        this.lastFrameTime = now;

        // Throttling: If frame time is too long, we might be on a slow device
        this.totalAnimationTime += dt * this.speed;

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(this.program!);
        this.gl.uniform1f(this.uniformLocations.u_time, this.totalAnimationTime * 0.001);

        if (this.resolutionChanged) {
            this.gl.uniform2f(this.uniformLocations.u_resolution, this.gl.canvas.width, this.gl.canvas.height);
            this.gl.uniform1f(this.uniformLocations.u_pixelRatio, this.internalDPR);
            this.resolutionChanged = false;
        }

        this.updateProvidedUniforms();
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        this.rafId = requestAnimationFrame(this.render);
    };

    updateProvidedUniforms = () => {
        Object.entries(this.providedUniforms).forEach(([key, val]) => {
            const loc = this.uniformLocations[key];
            if (!loc) return;
            if (Array.isArray(val)) {
                if (val.length === 2) this.gl.uniform2fv(loc, val);
                else if (val.length === 3) this.gl.uniform3fv(loc, val);
                else if (val.length === 4) this.gl.uniform4fv(loc, val);
            } else if (typeof val === "number") {
                this.gl.uniform1f(loc, val);
            }
        });
    };

    setSpeed = (s: number) => {
        this.speed = s;
        if (this.rafId === null && s !== 0) {
            this.lastFrameTime = performance.now();
            this.rafId = requestAnimationFrame(this.render);
        } else if (this.rafId !== null && s === 0) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    };

    setUniforms = (u: Record<string, any>) => {
        this.providedUniforms = { ...this.providedUniforms, ...u };
        this.updateProvidedUniforms();
    };

    dispose = () => {
        this.hasBeenDisposed = true;
        if (this.rafId) cancelAnimationFrame(this.rafId);
        if (this.resizeObserver) this.resizeObserver.disconnect();
        if (this.gl && this.program) this.gl.deleteProgram(this.program);
    };
}

// --- Main Components ---
const Warp = memo(function Warp(props: any) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mountRef = useRef<ShaderMountVanilla | null>(null);

    const uniforms = useMemo(() => ({
        u_scale: props.scale,
        u_rotation: props.rotation,
        u_color1: getShaderColorFromString(props.color1),
        u_color2: getShaderColorFromString(props.color2),
        u_color3: getShaderColorFromString(props.color3),
        u_proportion: props.proportion,
        u_softness: props.softness,
        u_distortion: props.distortion,
        u_swirl: props.swirl,
        u_swirlIterations: props.swirlIterations,
        u_shapeScale: props.shapeScale,
        u_shape: props.shape,
    }), [props.scale, props.rotation, props.color1, props.color2, props.color3, props.proportion, props.softness, props.distortion, props.swirl, props.swirlIterations, props.shapeScale, props.shape]);

    useEffect(() => {
        if (!canvasRef.current) return;
        mountRef.current = new ShaderMountVanilla(canvasRef.current, warpFragmentShader, uniforms, props.speed, props.seed);

        // OPTIMIZATION: Stop animation when page is hidden
        const handleVisibilityChange = () => {
            if (document.hidden) mountRef.current?.setSpeed(0);
            else mountRef.current?.setSpeed(props.speed || 0);
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            mountRef.current?.dispose();
        };
    }, []);

    useEffect(() => {
        mountRef.current?.setUniforms(uniforms);
    }, [uniforms]);

    useEffect(() => {
        mountRef.current?.setSpeed(props.speed || 0);
    }, [props.speed]);

    return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", ...props.style, contain: "strict" }} />;
});

export const LiquidBackground = memo(function LiquidBackground({ variant = "Lava" }: LiquidBackgroundProps) {
    const normalizedVariant = variant.charAt(0).toUpperCase() + variant.slice(1).toLowerCase();
    const values = templates[normalizedVariant] || templates.Lava;

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.01 });

    const currentSpeed = useMemo(() => {
        if (isInView) return speedEase(values.speed / 100) * 5;
        return 0;
    }, [isInView, values.speed]);

    return (
        <div ref={ref} className="fixed inset-0 z-[-1] overflow-hidden bg-black pointer-events-none" style={{ contain: "strict" }}>
            <Warp
                color1={values.color1}
                color2={values.color2}
                color3={values.color3}
                scale={values.scale}
                proportion={values.proportion / 100}
                distortion={values.distortion / 50}
                swirl={values.swirl / 100}
                swirlIterations={values.swirl === 0 ? 0 : values.swirlIterations}
                rotation={(values.rotation * Math.PI) / 180}
                speed={currentSpeed}
                seed={values.offset * 10}
                shape={PatternShapes[values.shape as keyof typeof PatternShapes]}
                shapeScale={values.shapeSize / 100}
                softness={values.softness / 100}
                style={{ width: "100%", height: "100%" }}
            />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                    contain: "strict"
                }}
            />
        </div>
    );
});

