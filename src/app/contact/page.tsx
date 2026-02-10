"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

// Dynamic import NaverMap to avoid SSR issues
const NaverMap = dynamic(() => import("@/components/NaverMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
    ),
});

export default function ContactPage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 pt-20">
                <div className="max-w-7xl mx-auto w-full px-6 py-10 lg:px-10">
                    {/* Breadcrumbs & Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Link href="/" className="hover:text-primary transition-colors">홈</Link>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-primary font-semibold">오시는 길</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                            오시는 길 & 시설 소개
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                            편안한 마음으로 방문해 주세요. 정신건강 회복을 위한 평화로운 환경을 갖추고 있습니다.
                        </p>
                    </div>

                    {/* Contact & Map Section */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {/* Naver Map */}
                        <div className="lg:col-span-2 relative overflow-hidden rounded-xl shadow-lg h-[400px] lg:h-auto min-h-[500px] border border-gray-100 dark:border-gray-800">
                            <NaverMap />
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">info</span>
                                    연락처 정보
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <span className="material-symbols-outlined text-primary mt-1">pin_drop</span>
                                        <div>
                                            <p className="font-bold">주소</p>
                                            <p className="text-gray-600 dark:text-gray-400 text-[17px] mt-1 leading-relaxed">
                                                서울특별시 구로구 디지털로 285<br />에이스트윈타워 203호
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="material-symbols-outlined text-primary mt-1">call</span>
                                        <div>
                                            <p className="font-bold">전화번호</p>
                                            <a href="tel:+8228565557" className="text-primary text-[22px] font-black mt-1 block hover:underline">
                                                02-856-5557
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Clinic Hours */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                                <div className="bg-primary text-white p-4 font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined">schedule</span>
                                    진료 시간
                                </div>
                                <div className="p-2">
                                    <table className="w-full text-sm">
                                        <tbody>
                                            <tr className="border-b border-gray-50 dark:border-gray-800">
                                                <td className="p-3 font-medium">월, 금</td>
                                                <td className="p-3 text-right">10:00 - 19:00</td>
                                            </tr>
                                            <tr className="border-b border-gray-50 dark:border-gray-800 bg-primary/5">
                                                <td className="p-3 font-bold text-primary">화, 목</td>
                                                <td className="p-3 text-right font-bold text-primary">10:00 - 20:00</td>
                                            </tr>
                                            <tr className="border-b border-gray-50 dark:border-gray-800">
                                                <td className="p-3 font-medium">토요일</td>
                                                <td className="p-3 text-right">10:00 - 13:00</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3 font-medium text-red-500">수, 일, 공휴일</td>
                                                <td className="p-3 text-right text-red-500">휴진</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Transportation Section */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-8">교통 안내</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 flex items-start gap-4">
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                                    <span className="material-symbols-outlined">subway</span>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">지하철</h4>
                                    <p className="text-[17px] text-gray-600 dark:text-gray-400 leading-relaxed">
                                        <span className="inline-block bg-green-500 text-white px-1.5 rounded text-[10px] font-bold mr-1">
                                            7호선
                                        </span>
                                        남구로역 1번 출구에서 685m<br />
                                        <span className="inline-block bg-green-500 text-white px-1.5 rounded text-[10px] font-bold mr-1">
                                            2호선
                                        </span>
                                        구로디지털단지역 3번 출구에서 650m
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 flex items-start gap-4">
                                <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                                    <span className="material-symbols-outlined">directions_bus</span>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">버스</h4>
                                    <p className="text-[17px] text-gray-600 dark:text-gray-400 leading-relaxed">
                                        <span className="font-bold text-green-600">5536, 5616, 6004</span><br />
                                        디지털산업1단지 정거장 하차
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 flex items-start gap-4">
                                <div className="bg-gray-100 text-gray-600 p-3 rounded-lg">
                                    <span className="material-symbols-outlined">local_parking</span>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">주차</h4>
                                    <p className="text-[17px] text-gray-600 dark:text-gray-400 leading-relaxed">
                                        건물 내 주차장 이용 가능<br />
                                        (자세한 안내는 전화 문의)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Clinic Tour Gallery */}
                    <section className="mb-16">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">시설 소개</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    현대적이고 편안한 시설을 둘러보세요.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    label: "로비",
                                    img: "/images/lobby0.jpg",
                                },
                                {
                                    label: "진료실",
                                    img: "/images/lobby1.jpg",
                                },
                                {
                                    label: "진료실",
                                    img: "/images/lobby2.JPG",
                                },
                                {
                                    label: "대기실",
                                    img: "/images/lobby3.jpg",
                                },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url('${item.img}')` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <p className="text-white text-sm font-bold">{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Bottom CTA */}
                    <div className="p-10 bg-primary/10 rounded-xl border border-primary/20 flex flex-col items-center text-center">
                        <h3 className="text-2xl font-bold mb-4">첫 걸음을 내딛을 준비가 되셨나요?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                            전문가들이 안전하고 비밀이 보장되는 공간에서 경청하고 전문적인 진료를 제공합니다.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="tel:+8228565557"
                                className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">call</span>
                                전화 예약
                            </a>
                            <Link
                                href="/guide"
                                className="bg-white dark:bg-background-dark text-primary border-2 border-primary px-8 py-3 rounded-lg font-bold hover:bg-primary/5 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">info</span>
                                진료 안내
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
