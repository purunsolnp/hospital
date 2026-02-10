"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "의료진 소개" },
    { href: "/treatments", label: "진료 과목" },
    { href: "/guide", label: "진료 안내" },
    { href: "/schedule", label: "진료 일정" },
    { href: "/notices", label: "공지사항" },
    { href: "/contact", label: "오시는 길" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="fixed top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#e5e7eb] dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/images/logo-horizontal.png"
                        alt="푸른솔 정신건강의학과"
                        className="h-12"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-semibold transition-colors ${isActive(link.href)
                                    ? "text-primary border-b-2 border-primary pb-0.5"
                                    : "hover:text-primary"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA & Mobile Menu Toggle */}
                <div className="flex items-center gap-4">
                    <a
                        href="tel:+8228565557"
                        className="hidden sm:flex items-center justify-center bg-primary text-white text-sm font-bold h-11 px-6 rounded-lg hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
                    >
                        전화 예약
                    </a>
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined">
                            {mobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-background-light dark:bg-background-dark border-t border-[#e5e7eb] dark:border-gray-800">
                    <nav className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-semibold transition-colors py-2 ${isActive(link.href)
                                        ? "text-primary font-bold"
                                        : "hover:text-primary"
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href="tel:+8228565557"
                            className="flex items-center justify-center bg-primary text-white text-sm font-bold h-11 px-6 rounded-lg hover:bg-primary-hover transition-all"
                        >
                            📞 전화 예약
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
