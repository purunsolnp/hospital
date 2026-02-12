"use client";

import { useEffect } from "react";

export default function SmoothScrollController() {
    useEffect(() => {
        // Enable smooth scrolling when component mounts
        document.documentElement.style.scrollBehavior = "smooth";

        // Revert to auto (default) when component unmounts
        return () => {
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    return null;
}
