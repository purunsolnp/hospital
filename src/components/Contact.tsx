"use client";

import dynamic from "next/dynamic";

// Dynamic import NaverMap to avoid SSR issues
const NaverMap = dynamic(() => import("@/components/NaverMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[400px] bg-white/5 rounded-[2.5rem] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
    ),
});

export default function Contact() {
    return (
        <section className="py-24 px-6 bg-[#111418] text-white">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-primary font-bold tracking-widest uppercase text-sm">
                            오시는 길
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                            편안한 마음으로
                            <br />
                            방문해 주세요
                        </h3>
                        <p className="text-gray-400 text-lg">
                            당신의 이야기를 경청할 준비가 되어있습니다.
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">
                                    call
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">
                                    전화번호
                                </p>
                                <a
                                    href="tel:+8228565557"
                                    className="text-xl font-bold hover:text-primary transition-colors"
                                >
                                    02-856-5557
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">
                                    location_on
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">
                                    주소
                                </p>
                                <p className="text-lg font-bold leading-relaxed">
                                    서울특별시 구로구 디지털로 285<br />
                                    에이스트윈타워 203호
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary">
                                    schedule
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">
                                    진료시간
                                </p>
                                <div className="text-lg font-bold leading-relaxed">
                                    <p>월, 금: 10:00 - 19:00</p>
                                    <p>화, 목: 10:00 - 20:00</p>
                                    <p>토: 10:00 - 13:00</p>
                                    <p className="text-red-400">수, 일, 공휴일: 휴진</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Naver Map */}
                <div className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden min-h-[400px]">
                    <NaverMap />
                </div>
            </div>
        </section>
    );
}
