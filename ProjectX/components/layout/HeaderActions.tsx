"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface HeaderActionsProps {
    children: React.ReactNode;
}

export function HeaderActions({ children }: HeaderActionsProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const target = document.getElementById("header-actions");
    if (!target) return null;

    return createPortal(children, target);
}
