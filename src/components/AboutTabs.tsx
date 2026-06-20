"use client";

import { useState } from "react";

const doctors = [
    {
        id: "jeon",
        label: "전한솔 원장",
        role: "푸른솔 정신건강의학과 대표원장",
        quote:
            "경청과 전문성으로 치유합니다. 공감과 과학적 정밀함에 뿌리를 둔 진료 철학을 실천합니다.",
        tags: ["정신건강의학과 전문의", "영어 진료 가능"],
        philosophy:
            "푸른솔 정신건강의학과에서는 정신건강이 단순히 질병의 부재가 아니라, 자신의 평화를 되찾아가는 여정이라고 믿습니다. 근거 중심의 임상 진료와 각 환자의 고유한 이야기를 이해하고자 하는 깊은 헌신을 결합하여, 치유와 성장을 위한 안전하고 비밀이 보장되는 숲과 같은 공간을 제공합니다.",
        experiences: [
            {
                title: "푸른솔 정신건강의학과 대표원장",
                description: "현재",
            },
            {
                title: "정신건강의학과 전문의 취득",
                description: "대한민국 보건복지부",
            },
        ],
        education: [
            {
                title: "서울대학교 졸업",
                description: "학부",
            },
            {
                title: "건국대학교 의학전문대학원 졸업",
                description: "석사",
            },
        ],
        certifications: [
            "학교응급심리지원 전문가 수료",
            "대한 신경정신의학회 정회원",
            "정서인지행동의학회 정회원",
            "한일 정신의학회 정회원",
        ],
        publications: [
            {
                label: "주요 논문",
                title: "불면증으로 의뢰된 입원환자의 임상적 특징 및 협진 유형 분석",
                note: "대한수면의학회, 수면 정신생리 25(2) : 68-73, 2018",
            },
            {
                label: "국제 발표",
                title: "The Characteristics and Types of Psychiatric Consultation for Insomnia Symptom in Hospitalized Patients",
                note: "",
            },
            {
                label: "학회 참가",
                title: "제 19회 한일정신의학회",
                note: "참가 및 정신 분석 치료 사례 발표 (한국 참가자 대표)",
            },
        ],
    },
    {
        id: "new",
        label: "조현정 원장",
        role: "정신건강의학과 전문의",
        quote:
            "환자 한 분 한 분의 이야기에 깊이 귀를 기울이며, 함께 건강한 일상을 다시 설계합니다.",
        tags: ["정신건강의학과 전문의", "노인정신건강의학 인증의"],
        philosophy:
            "조현정 원장님은 환자의 경험과 마음의 상태를 존중하며, 정서와 행동을 함께 다루는 통합적인 접근을 지향합니다. 심리적 안정, 사회적 지지, 신체적 건강을 동시에 고려한 진료 철학으로, 개인 맞춤형 회복 여정을 돕습니다.",
        experiences: [
            { title: "강동성심병원 인턴 수료" },
            { title: "강동성심병원 정신건강의학과 전문의 수료" },
            { title: "강동성심병원 전임 강사 (노인정신의학, 일반정신의학)" },
            { title: "하남시 정신보건센터 임상자문의" },
            { title: "노인정신건강 인증 과정 수료" },
            { title: "강동구 치매지원센터 부센터장" },
            { title: "두드림 정신과 의원 (부천) 의료진" },
            { title: "인천 정병원 의료진" },
            { title: "마음행복 정신건강의학과 (인천 청라) 의료진" },
            { title: "가로수 정신건강의학과 (인천 논현) 의료진" },
        ],
        education: [
            { title: "한림대학교 의과대학" },
        ],
        certifications: [
            "대한신경정신의학회 정회원",
            "대한노인정신의학회 정회원",
            "대한청소년정신의학회 평생회원",
            "대한신경정신의학회 홍보기획위원회 활동",
        ],
        publications: [],
    },
];

export default function AboutTabs() {
    const [selectedId, setSelectedId] = useState(doctors[0].id);
    const doctor = doctors.find((item) => item.id === selectedId) ?? doctors[0];

    return (
        <div className="space-y-10">
            <section className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-start sm:justify-between">
                    <div className="min-w-0 sm:max-w-[60%]">
                        <p className="text-sm font-semibold uppercase tracking-widest text-primary/90 mb-3">
                            의료진 소개
                        </p>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                            {doctor.label}
                        </h1>
                        <p className="mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
                            {doctor.quote}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 sm:max-w-[35%]">
                        {doctor.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-2 text-sm font-semibold shadow-sm"
                            >
                                <span className="material-symbols-outlined text-primary text-lg">verified</span>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 rounded-full bg-gray-100 dark:bg-gray-900/60 p-2">
                    {doctors.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedId(item.id)}
                            className={`rounded-full px-5 py-3 text-sm font-bold transition-colors ${item.id === selectedId
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </section>

            <section className="bg-primary text-white rounded-xl p-8 md:p-12">
                <div className="relative">
                    <div className="absolute top-0 right-0 opacity-10 text-[160px]">
                        <span className="material-symbols-outlined">format_quote</span>
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-1 bg-white/40 inline-block"></span>
                            <h2 className="text-2xl font-bold">진료 철학</h2>
                        </div>
                        <p className="text-lg md:text-xl leading-relaxed font-medium">
                            {doctor.philosophy}
                        </p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="material-symbols-outlined text-primary text-3xl">work_outline</span>
                        <h3 className="text-2xl font-bold tracking-tight">경력 사항</h3>
                    </div>
                    <ul className="space-y-6">
                        {doctor.experiences.map((item) => (
                            <li key={item.title} className="flex gap-4 group">
                                <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                <div>
                                    <p className="font-bold text-lg">{item.title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="material-symbols-outlined text-primary text-3xl">school</span>
                        <h3 className="text-2xl font-bold tracking-tight">학력</h3>
                    </div>
                    <ul className="space-y-6">
                        {doctor.education.map((item) => (
                            <li key={item.title} className="flex gap-4 group">
                                <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                <div>
                                    <p className="font-bold text-lg">{item.title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                        <h3 className="text-2xl font-bold tracking-tight">자격 및 수료</h3>
                    </div>
                    <ul className="space-y-4">
                        {doctor.certifications.map((item) => (
                            <li key={item} className="flex gap-4 group">
                                <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                <p className="font-medium">{item}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    {doctor.publications.length > 0 && (
                        <>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-primary text-3xl">article</span>
                                <h3 className="text-2xl font-bold tracking-tight">논문 및 발표</h3>
                            </div>
                            <div className="space-y-6">
                                {doctor.publications.map((item) => (
                                    <div key={item.title}>
                                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                                            {item.label}
                                        </p>
                                        <p className="font-bold text-lg mb-1">{item.title}</p>
                                        {item.note ? (
                                            <p className="text-gray-500 text-sm">{item.note}</p>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </div>

            <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row gap-10 items-start">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-6 text-primary leading-tight">
                        당신의 소중한 일상,
                        <br className="md:hidden" /> 푸른솔이 함께 지키겠습니다
                    </h3>
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-6 mb-8">
                        <p>
                            인생의 예기치 못한 소나기 속에 마음의 흉터가 깊어질 때가 있습니다.
                            <br className="hidden md:block" /> 어디서부터 이야기를 시작해야 할지 몰라 망설여진다면,
                            <br className="hidden md:block" /> 언제든 푸른솔의 문을 두드려 주세요.
                        </p>
                        <p className="font-medium text-gray-800 dark:text-gray-200">
                            공감하며 듣겠습니다.
                            <br /> 함께 상처를 들여다보겠습니다.
                            <br /> 건강한 치유로 일상을 되찾아 드립니다.
                        </p>
                        <p className="font-bold text-primary text-lg">
                            다시 시작될 당신의 빛나는 일상을
                            <br className="md:hidden" /> 푸른솔정신건강의학과가 응원합니다.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="tel:+8228565557"
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:shadow-lg transition-all"
                        >
                            <span className="material-symbols-outlined">calendar_month</span>
                            진료 예약하기
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-64 bg-sage-50 dark:bg-background-dark rounded-lg p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-800">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400">진료 시간</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium">월, 목</span>
                            <span className="text-primary font-bold">10:00 - 20:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">화, 금</span>
                            <span className="text-primary font-bold">10:00 - 19:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">토요일</span>
                            <span className="text-primary font-bold">10:00 - 13:00</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span className="font-medium">수, 일, 공휴일</span>
                            <span>휴진</span>
                        </div>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <div className="flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-primary text-sm">call</span>
                        <span className="font-bold">02-856-5557</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
