"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Notice {
    id: number;
    title: string;
    content: string;
    date: string;
    category?: string;
    pinned: boolean;
}

function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function getCategoryStyle(category?: string) {
    switch (category) {
        case "휴진":
            return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
        case "학회":
            return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
        case "단축진료":
            return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
        default:
            return "bg-primary/10 text-primary";
    }
}

export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

    useEffect(() => {
        async function fetchNotices() {
            try {
                const res = await fetch("/api/notices");
                const data = await res.json();
                if (data.success) {
                    setNotices(data.notices);
                } else {
                    setError("데이터를 불러오는데 실패했습니다.");
                }
            } catch (err) {
                setError("서버 연결에 실패했습니다.");
            } finally {
                setLoading(false);
            }
        }
        fetchNotices();
    }, []);

    const pinnedNotices = notices.filter((n) => n.pinned);
    const regularNotices = notices.filter((n) => !n.pinned);

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero Section */}
                <div className="bg-primary/5 py-16 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full">
                            소식
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                            공지사항
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            푸른솔 정신건강의학과의 최신 소식과 공지사항을 확인하세요.
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 py-12">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                            <span className="material-symbols-outlined text-red-500 text-3xl mb-2">
                                error
                            </span>
                            <p className="text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            {/* Pinned Notices */}
                            {pinnedNotices.length > 0 && (
                                <section className="mb-12">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="material-symbols-outlined text-primary">
                                            push_pin
                                        </span>
                                        <h2 className="text-lg font-bold text-primary">중요 공지</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {pinnedNotices.map((notice) => (
                                            <article
                                                key={notice.id}
                                                onClick={() => setSelectedNotice(notice)}
                                                className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-colors cursor-pointer"
                                            >
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    {notice.category && (
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryStyle(
                                                                notice.category
                                                            )}`}
                                                        >
                                                            {notice.category}
                                                        </span>
                                                    )}
                                                    <span className="text-sm text-gray-500">
                                                        {formatDate(notice.date)}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                                                        <span className="material-symbols-outlined text-xs">
                                                            push_pin
                                                        </span>
                                                        고정됨
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">{notice.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                                                    {notice.content.split("\n")[0]}
                                                </p>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Regular Notices */}
                            <section>
                                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-gray-400">
                                        article
                                    </span>
                                    전체 공지
                                </h2>
                                {regularNotices.length > 0 ? (
                                    <div className="space-y-4">
                                        {regularNotices.map((notice) => (
                                            <article
                                                key={notice.id}
                                                onClick={() => setSelectedNotice(notice)}
                                                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                                            >
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    {notice.category && (
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryStyle(
                                                                notice.category
                                                            )}`}
                                                        >
                                                            {notice.category}
                                                        </span>
                                                    )}
                                                    <span className="text-sm text-gray-500">
                                                        {formatDate(notice.date)}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                                    {notice.title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                                                    {notice.content.split("\n")[0]}
                                                </p>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-12 text-center">
                                        <span className="material-symbols-outlined text-5xl text-gray-400 mb-4">
                                            inbox
                                        </span>
                                        <p className="text-gray-500 text-lg">등록된 공지사항이 없습니다.</p>
                                    </div>
                                )}
                            </section>
                        </>
                    )}

                    {/* Contact CTA */}
                    <div className="mt-16 bg-sage-50 dark:bg-gray-800 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-2">추가 문의사항이 있으신가요?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                궁금한 점이 있으시면 언제든 연락 주세요.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="tel:+8228565557"
                                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
                            >
                                <span className="material-symbols-outlined">call</span>
                                전화 문의
                            </a>
                            <Link
                                href="/schedule"
                                className="flex items-center gap-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white px-6 py-3 rounded-lg font-bold border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                <span className="material-symbols-outlined">calendar_month</span>
                                진료 일정
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Notice Detail Modal */}
                {selectedNotice && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setSelectedNotice(null)}
                    >
                        <div
                            className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        {selectedNotice.category && (
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryStyle(
                                                    selectedNotice.category
                                                )}`}
                                            >
                                                {selectedNotice.category}
                                            </span>
                                        )}
                                        <span className="text-sm text-gray-500">
                                            {formatDate(selectedNotice.date)}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold">{selectedNotice.title}</h2>
                                </div>
                                <button
                                    onClick={() => setSelectedNotice(null)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                    {selectedNotice.content}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
