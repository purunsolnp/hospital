"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                    <Link href="/" className="text-sm font-semibold hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-semibold hover:text-primary transition-colors">
                        의료진 소개
                    </Link>
                    <Link href="/treatments" className="text-sm font-semibold hover:text-primary transition-colors">
                        진료 과목
                    </Link>
                    <Link href="/guide" className="text-sm font-semibold hover:text-primary transition-colors">
                        진료 안내
                    </Link>
                    <Link href="/schedule" className="text-sm font-semibold hover:text-primary transition-colors">
                        진료 일정
                    </Link>
                    <Link href="/notices" className="text-sm font-semibold hover:text-primary transition-colors">
                        공지사항
                    </Link>
                    <Link href="/contact" className="text-sm font-semibold hover:text-primary transition-colors">
                        오시는 길
                    </Link>
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
                        <Link
                            href="/"
                            className="text-sm font-semibold hover:text-primary transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-semibold hover:text-primary transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            의료진 소개
                        </Link>
                        <Link
                            href="/treatments"
                            className="text-sm font-semibold hover:text-primary transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            진료 과목
                        </Link>
                        <Link
                            href="/guide"
                            className="text-sm font-semibold hover:text-primary transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            진료 안내
                        </Link>
                        <Link
                            href="/schedule"
                            className="text-sm font-semibold hover:text-primary transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            진료 일정
                        </Link>
                        <Link
                            href="/notices"
                            className="text-sm font-semibold hover:text-primary transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            공지사항
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-semibold hover:text-primary transition-colors py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            오시는 길
                        </Link>
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
