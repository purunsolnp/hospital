"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dynamic import to avoid SSR issues with FullCalendar
const Calendar = dynamic(() => import("@/components/Calendar"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
    ),
});

// Regular schedule data (fixed)
const regularHours = [
    { day: "월요일", hours: "10:00 - 20:00", note: "야간 진료" },
    { day: "화요일", hours: "10:00 - 19:00", note: "" },
    { day: "수요일", hours: "휴진", note: "" },
    { day: "목요일", hours: "10:00 - 20:00", note: "야간 진료" },
    { day: "금요일", hours: "10:00 - 19:00", note: "" },
    { day: "토요일", hours: "10:00 - 13:00", note: "" },
    { day: "일요일", hours: "휴진", note: "" },
];

export default function SchedulePage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero Section */}
                <div className="bg-primary/5 py-16 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full">
                            진료 일정
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                            병원 일정
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            휴진, 학회, 단축진료 등의 일정을 달력에서 확인하세요.
                        </p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-12">
                    {/* Calendar Section */}
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="material-symbols-outlined text-primary text-3xl">
                                calendar_month
                            </span>
                            <h2 className="text-2xl font-bold">병원 일정 달력</h2>
                        </div>
                        <Calendar />

                        {/* Legend */}
                        <div className="mt-6 flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-[#ff6b6b]"></div>
                                <span>휴진</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-[#4dabf7]"></div>
                                <span>학회/진료</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-[#ffa94d]"></div>
                                <span>단축진료</span>
                            </div>
                        </div>
                    </section>

                    {/* Regular Hours */}
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="material-symbols-outlined text-primary text-3xl">
                                schedule
                            </span>
                            <h2 className="text-2xl font-bold">정기 진료 시간</h2>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-primary text-white">
                                        <th className="px-6 py-4 text-left font-bold">요일</th>
                                        <th className="px-6 py-4 text-left font-bold">진료 시간</th>
                                        <th className="px-6 py-4 text-left font-bold">비고</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {regularHours.map((item, idx) => (
                                        <tr
                                            key={item.day}
                                            className={`border-b border-gray-100 dark:border-gray-800 ${item.hours === "휴진"
                                                    ? "bg-red-50 dark:bg-red-900/10"
                                                    : idx % 2 === 0
                                                        ? "bg-white dark:bg-gray-900"
                                                        : "bg-gray-50 dark:bg-gray-800/50"
                                                }`}
                                        >
                                            <td className="px-6 py-4 font-semibold">{item.day}</td>
                                            <td
                                                className={`px-6 py-4 ${item.hours === "휴진"
                                                        ? "text-red-500 font-bold"
                                                        : "text-primary font-bold"
                                                    }`}
                                            >
                                                {item.hours}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {item.note && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                                                        <span className="material-symbols-outlined text-xs">
                                                            nights_stay
                                                        </span>
                                                        {item.note}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">info</span>
                            점심 시간: 13:00 - 14:00 (진료 없음)
                        </p>
                    </section>

                    {/* Contact CTA */}
                    <div className="bg-primary/10 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-2">일정 관련 문의</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                진료 일정에 대한 추가 문의는 전화로 연락 주세요.
                            </p>
                        </div>
                        <a
                            href="tel:+8228565557"
                            className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
                        >
                            <span className="material-symbols-outlined">call</span>
                            02-856-5557
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
