"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Helper function to get row background color based on non-insurance category
function getNonInsuranceRowStyle(category: string) {
    if (category.includes("검사")) return "bg-sage-50/50 dark:bg-sage-900/20";
    if (category.includes("제증명")) return "bg-blue-50/50 dark:bg-blue-900/20";
    if (category.includes("약제")) return "bg-amber-50/50 dark:bg-amber-900/20";
    if (category.includes("상담")) return "bg-purple-50/50 dark:bg-purple-900/20";
    return "bg-white dark:bg-gray-800";
}

export default function GuidePage() {
    const [activeTab, setActiveTab] = useState("process");
    const [nonInsuranceItems, setNonInsuranceItems] = useState<any[]>([]);
    const [loadingNonInsurance, setLoadingNonInsurance] = useState(false);

    useEffect(() => {
        if (activeTab === "non-insurance" && nonInsuranceItems.length === 0) {
            setLoadingNonInsurance(true);
            fetch("/api/non-insurance")
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setNonInsuranceItems(data.items);
                    }
                })
                .catch((err) => console.error(err))
                .finally(() => setLoadingNonInsurance(false));
        }
    }, [activeTab]);

    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors">
            <Header />
            <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">진료 안내</h1>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-3 mb-10 md:flex md:justify-center md:flex-wrap">
                    <button
                        onClick={() => setActiveTab("process")}
                        className={`px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all shadow-sm ${activeTab === "process"
                            ? "bg-primary text-white shadow-md ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                    >
                        진료 과정
                    </button>
                    <button
                        onClick={() => setActiveTab("proxy")}
                        className={`px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all shadow-sm ${activeTab === "proxy"
                            ? "bg-primary text-white shadow-md ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                    >
                        대리처방 안내
                    </button>
                    <button
                        onClick={() => setActiveTab("privacy")}
                        className={`px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all shadow-sm ${activeTab === "privacy"
                            ? "bg-primary text-white shadow-md ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                    >
                        개인정보 처리방침
                    </button>
                    <button
                        onClick={() => setActiveTab("non-insurance")}
                        className={`px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all shadow-sm ${activeTab === "non-insurance"
                            ? "bg-primary text-white shadow-md ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                    >
                        비급여 안내
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 shadow-lg border border-gray-100 dark:border-gray-800">

                    {/* Treatment Process Content */}
                    {activeTab === "process" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl font-bold text-primary mb-2">진료 절차 안내</h2>
                                <p className="text-gray-500 dark:text-gray-400">처음 오신 분들도, 다시 오신 분들도 편안하게 진료받으실 수 있습니다.</p>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12 mb-16">
                                {/* First Visit (초진) */}
                                <div className="bg-sage-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-sage-100 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                                            <span className="bg-primary/10 text-primary w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-sm">01</span>
                                            초진 <br className="md:hidden" />(First Visit)
                                        </h3>
                                        <span className="text-xs font-bold px-3 py-1 bg-primary text-white rounded-full uppercase tracking-tighter shadow-sm">약 50분 소요</span>
                                    </div>
                                    <div className="space-y-0 relative">
                                        {/* Step 1 */}
                                        <div className="flex gap-6 pb-12 relative">
                                            <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700 last:hidden"></div>
                                            <div className="z-10 bg-white dark:bg-gray-800 text-primary w-12 h-12 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 border border-gray-100 dark:border-gray-700">
                                                <span className="material-symbols-outlined">how_to_reg</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">접수 & 기록지 작성</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-[17px] leading-relaxed">
                                                    데스크에서 <strong>신분증</strong>을 제시하고 접수합니다.<br />
                                                    초진 기록지를 작성하며 기본 정보를 확인합니다.
                                                </p>
                                            </div>
                                        </div>
                                        {/* Step 2 */}
                                        <div className="flex gap-6 pb-12 relative">
                                            <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="z-10 bg-white dark:bg-gray-800 text-primary w-12 h-12 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 border border-gray-100 dark:border-gray-700">
                                                <span className="material-symbols-outlined">forum</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">진료 및 상담</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-[17px] leading-relaxed">
                                                    전문의와 상세한 상담을 진행합니다.<br />
                                                    현재의 어려움과 증상에 대해 이야기합니다.
                                                </p>
                                            </div>
                                        </div>
                                        {/* Step 3 */}
                                        <div className="flex gap-6 pb-12 relative">
                                            <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700"></div>
                                            <div className="z-10 bg-white dark:bg-gray-800 text-primary w-12 h-12 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 border border-gray-100 dark:border-gray-700">
                                                <span className="material-symbols-outlined">assignment_add</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">검사 진행</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-[17px] leading-relaxed">
                                                    필요 시 심리검사, 뇌파검사, 스트레스 검사 등<br />
                                                    정확한 진단을 위한 검사를 진행할 수 있습니다.
                                                </p>
                                            </div>
                                        </div>
                                        {/* Step 4 */}
                                        <div className="flex gap-6 relative">
                                            <div className="z-10 bg-white dark:bg-gray-800 text-primary w-12 h-12 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 border border-gray-100 dark:border-gray-700">
                                                <span className="material-symbols-outlined">medication</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">치료 계획 수립</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-[17px] leading-relaxed">
                                                    검사 결과와 상담 내용을 종합하여<br />
                                                    개인 맞춤형 치료 계획을 수립하고 처방합니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Follow-up (재진) */}
                                <div className="bg-white dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                                            <span className="bg-primary/10 text-primary w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-sm">02</span>
                                            재진 <br className="md:hidden" />(Follow-up)
                                        </h3>
                                        <span className="text-xs font-bold px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full uppercase tracking-tighter">약 15-20분 소요</span>
                                    </div>
                                    <div className="space-y-0 relative">
                                        {/* Step 1 */}
                                        <div className="flex gap-6 pb-12 relative">
                                            <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-gray-100 dark:bg-gray-800"></div>
                                            <div className="z-10 bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined">event_available</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">접수 및 도착 확인</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-[17px] leading-relaxed">
                                                    데스크에 도착을 알리고,<br />
                                                    변경된 연락처나 사항이 있다면 말씀해주세요.
                                                </p>
                                            </div>
                                        </div>
                                        {/* Step 2 */}
                                        <div className="flex gap-6 pb-12 relative">
                                            <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-gray-100 dark:bg-gray-800"></div>
                                            <div className="z-10 bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined">healing</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">경과 상담</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-[17px] leading-relaxed">
                                                    지난 진료 이후의 변화와 약물 효과 등을<br />
                                                    확인하고 치료 방향을 조정합니다.
                                                </p>
                                            </div>
                                        </div>
                                        {/* Step 3 */}
                                        <div className="flex gap-6 relative">
                                            <div className="z-10 bg-primary/10 text-primary w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined">calendar_add_on</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">수납 및 다음 예약</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-[17px] leading-relaxed">
                                                    데스크에서 수납 후<br />
                                                    다음 내원 일정을 예약합니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10 bg-primary/5 rounded-2xl p-6 border border-primary/10">
                                        <p className="text-primary font-bold text-sm mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">info</span>
                                            예약 권장
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                                            대기 시간을 줄이고 원활한 진료를 위해 <strong>전화</strong> 또는 <strong>모바일 앱</strong>을 통한 예약을 권장합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-gray-800 my-16"></div>

                            {/* Reservation & FAQ */}
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined">calendar_month</span>
                                        예약 안내
                                    </h3>
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-sage-50 dark:bg-gray-700 flex items-center justify-center text-primary shrink-0">
                                                <span className="material-symbols-outlined">call</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">전화 예약</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-[17px] mb-2">진료 시간 내 언제든 문의 가능합니다.</p>
                                                <a href="tel:028565557" className="text-primary font-bold text-lg hover:underline">02-856-5557</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-sage-50 dark:bg-gray-700 flex items-center justify-center text-primary shrink-0">
                                                <span className="material-symbols-outlined">phone_iphone</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">앱 예약 (아임파인)</h4>
                                                <p className="text-gray-600 dark:text-gray-400 text-[17px] mb-3">간편하게 모바일로 예약하세요.</p>
                                                <div className="flex gap-2">
                                                    <a href="https://play.google.com/store/apps/details?id=io.lokks.careease&hl=ko" target="_blank" className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-sm">android</span> Android
                                                    </a>
                                                    <a href="https://apps.apple.com/kr/app/id1573100943" target="_blank" className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-sm">ios</span> iOS
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined">help</span>
                                        자주 묻는 질문
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-[17px] mb-2">📌 초진 시 예약이 필수인가요?</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-[17px]">
                                                전화 예약 후 방문을 권장합니다. 당일 현장 접수 시 대기 시간이 길어지거나 진료가 어려울 수 있습니다.
                                            </p>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-[17px] mb-2">📌 초진 시 신분증이 필요한가요?</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-[17px]">
                                                네, 의료법 개정에 따라 <strong>본인 확인 절차가 의무화</strong>되어 신분증을 반드시 지참하셔야 합니다.
                                            </p>
                                        </div>
                                        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-[17px] mb-2">📌 진료 기록이 남나요?</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-[17px]">
                                                의료법에 따라 철저히 비밀이 보장됩니다. 본인의 동의 없이는 타인이나 직장에 공개되지 않습니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Proxy Prescription Content */}
                    {activeTab === "proxy" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold text-primary mb-4 text-center">대리처방 안내</h2>

                            <div className="bg-sage-50 dark:bg-primary/10 p-6 rounded-xl border border-sage-200 dark:border-primary/20 text-center">
                                <p className="text-lg font-bold text-primary leading-relaxed">
                                    의료법에 따라 환자 <u className="underline-offset-4 decoration-2">대면진료가 원칙</u>입니다.<br />
                                    단, 아래 요건에 해당하는 경우에만 직접 진찰한 의사가<br className="hidden md:block" />
                                    대리수령자에게 처방전을 교부할 수 있습니다.
                                </p>
                                <p className="text-xs text-gray-500 mt-4">
                                    ※ 의료법 제17조의2, 시행령 제10조의2, 시행규칙 제12조의2 [시행일: 2020. 2. 28]
                                </p>
                            </div>

                            <div className="border-t border-gray-100 dark:border-gray-800 my-8"></div>

                            <div>
                                <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    대리처방이 가능한 경우
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="bg-sage-100 dark:bg-gray-800 text-primary">
                                                <th className="border border-gray-200 dark:border-gray-700 p-3 text-left w-1/4">구분</th>
                                                <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">설명</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm md:text-base">
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">환자의 의식이 없는 경우</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">
                                                    의식이 없어서 본인이 처방을 받을 수 없는 경우
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold align-top">아래 3가지 조건을<br />모두 충족</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">
                                                    <ol className="list-decimal pl-5 space-y-2">
                                                        <li>
                                                            환자의 거동이 현저히 곤란함<br />
                                                            <span className="text-xs text-gray-500">(예: 교정시설 수용자, 정신질환자, 치매 노인 등)</span>
                                                        </li>
                                                        <li>같은 질환에 대해 계속 진료를 받아온 경우</li>
                                                        <li>
                                                            오랜 기간 같은 처방이 이루어진 경우<br />
                                                            <span className="text-xs text-gray-500">
                                                                ※ 단, <b>의학적 판단</b>에 따라 안전성이 인정되는 경우에만 가능하며, 의료인은 대리처방을 거절할 수 있습니다.
                                                            </span>
                                                        </li>
                                                    </ol>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-gray-800 my-8"></div>

                            <div>
                                <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined">person</span>
                                    대리수령자의 범위
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="bg-sage-100 dark:bg-gray-800 text-primary">
                                                <th className="border border-gray-200 dark:border-gray-700 p-3 text-left w-1/4">구분</th>
                                                <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">대리수령자</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm md:text-base">
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">직계가족</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">부모 및 자녀(직계존속·비속)</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">배우자</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">배우자 및 배우자의 부모(직계존속)</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">형제/자매</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">형제·자매</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">기타 가족</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">사위, 며느리(직계비속의 배우자)</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">노인복지시설</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">
                                                    노인의료복지시설 종사자<br />
                                                    <span className="text-xs text-gray-500">(노인복지법상 노인요양시설, 노인요양공동생활가정)</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">기타</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">
                                                    보건복지부장관이 인정하는 사람<br />
                                                    <span className="text-xs text-gray-500">(교정시설 직원, 장애인복지법상 장애인거주시설 종사자 등)</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-gray-800 my-8"></div>

                            <div>
                                <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined">description</span>
                                    구비서류
                                </h3>
                                <div className="overflow-x-auto mb-8">
                                    <table className="w-full border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="bg-sage-100 dark:bg-gray-800 text-primary">
                                                <th className="border border-gray-200 dark:border-gray-700 p-3 text-left w-1/3">서류명</th>
                                                <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">비고</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm md:text-base">
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">대리수령자의 신분증</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">사본 가능</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">환자의 신분증</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">
                                                    사본 가능<br />
                                                    <span className="text-xs text-gray-500">만 17세 미만으로 주민등록증이 없는 경우 제외</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">관계를 증명할 수 있는 서류</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">가족관계증명서, 주민등록등본, 재직증명서 등</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 font-semibold">대리처방 동의서</td>
                                                <td className="border border-gray-200 dark:border-gray-700 p-3 text-gray-600 dark:text-gray-300">작성하여 내원</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-center">
                                    <a
                                        href="http://www.bmmh.or.kr/upload/board/%EB%8C%80%EB%A6%AC%EC%A7%84%EB%A3%8C(%EC%B2%98%EB%B0%A9)%EB%8F%99%EC%9D%98%EC%84%9C.pdf"
                                        target="_blank"
                                        className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-hover transition-colors shadow-lg"
                                    >
                                        <span className="material-symbols-outlined">download</span>
                                        대리처방 동의서 다운로드
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Privacy Policy Content */}
                    {activeTab === "privacy" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold text-primary mb-4 text-center">🔒 개인정보 처리방침</h2>

                            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                <p>
                                    푸른솔 정신건강의학과(이하 ‘본 병원’)는 개인정보 보호를 중요하게 생각하며,
                                    관련 법령을 준수하고 있습니다.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-2">1. 개인정보의 수집 및 이용 목적</h3>
                                <div className="pl-4 space-y-2 text-gray-600 dark:text-gray-300">
                                    <p>본 병원은 방문자의 개인정보를 직접 수집하지 않습니다.</p>
                                    <p>다만, 홈페이지 이용 과정에서 자동으로 다음과 같은 정보가 수집될 수 있습니다.</p>
                                    <ul className="list-disc pl-5 mt-2 space-y-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                        <li>IP 주소, 브라우저 정보, 방문 일시</li>
                                        <li>홈페이지 운영 및 서비스 개선 목적</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-2">2. 개인정보의 보관 및 보호</h3>
                                <div className="pl-4 space-y-2 text-gray-600 dark:text-gray-300">
                                    <p>본 병원은 방문자의 개인정보를 제3자에게 제공하지 않으며, 법적 요구가 있는 경우에만 제공됩니다.</p>
                                    <p>개인정보 보호를 위해 SSL 적용, 방화벽 보안 강화 등의 조치를 취하고 있습니다.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-2">3. 개인정보 보호책임자 및 문의</h3>
                                <div className="pl-4 space-y-2 text-gray-600 dark:text-gray-300">
                                    <p>개인정보 보호 관련 문의사항이 있으시면 아래 연락처로 문의해 주세요.</p>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-2">
                                        <p><strong>담당자:</strong> 전한솔 원장</p>
                                        <p><strong>전화:</strong> 02-856-5557</p>
                                        <p><strong>이메일:</strong> purunsolnp@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-2">4. 개인정보처리방침 변경</h3>
                                <div className="pl-4 space-y-2 text-gray-600 dark:text-gray-300">
                                    <p>본 방침은 법령 및 운영 방침 변경에 따라 업데이트될 수 있으며, 변경 사항은 홈페이지를 통해 공지됩니다.</p>
                                    <div className="text-sm text-gray-500 mt-4">
                                        <p>최초 시행일: 2022년 10월 12일</p>
                                        <p>최종 수정일: 2025년 3월 26일</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Non-insurance Content */}
                    {activeTab === "non-insurance" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                            <h2 className="text-2xl font-bold text-primary mb-4">비급여 안내</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-8">
                                본원에서 제공하는 비급여 진료 항목에 대한 상세 정보는 아래 이미지를 참고해 주세요.
                            </p>

                            <div className="max-w-4xl mx-auto">
                                {loadingNonInsurance ? (
                                    <div className="flex justify-center py-20">
                                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-sage-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                                                    <th className="p-4 font-bold whitespace-nowrap">분류</th>
                                                    <th className="p-4 font-bold whitespace-nowrap">코드</th>
                                                    <th className="p-4 font-bold">상세내역</th>
                                                    <th className="p-4 font-bold text-right whitespace-nowrap">금액</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm md:text-base">
                                                {nonInsuranceItems.length > 0 ? (
                                                    nonInsuranceItems.map((item, index) => (
                                                        <tr
                                                            key={index}
                                                            className={`border-b border-gray-100 dark:border-gray-700 last:border-0 hover:brightness-95 dark:hover:brightness-110 transition-colors ${getNonInsuranceRowStyle(item.category)}`}
                                                        >
                                                            <td className="p-4 text-primary font-bold whitespace-nowrap align-top">{item.category}</td>
                                                            <td className="p-4 text-gray-700 font-mono text-sm font-medium align-top">{item.code}</td>
                                                            <td className="p-4 text-gray-900 dark:text-gray-100 font-medium text-base align-top">{item.description}</td>
                                                            <td className="p-4 text-right font-bold text-gray-900 dark:text-white whitespace-nowrap align-top">{item.price}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                                            등록된 비급여 항목이 없습니다.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </main >
            <Footer />
        </div >
    );
}
