import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
    title: "의료진 소개 | 푸른솔 정신건강의학과",
    description: "푸른솔 정신건강의학과 전한솔 원장 소개",
};

export default function AboutPage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 pt-20">
                {/* Breadcrumbs */}
                <div className="max-w-[1024px] mx-auto px-6 py-8">
                    <div className="flex items-center gap-2 mb-8 text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-primary transition-colors">홈</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-primary font-bold">의료진 소개</span>
                    </div>

                    {/* Hero Section */}
                    <section className="mb-16">
                        <div className="flex flex-col gap-6">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                                    대표원장
                                </span>
                                <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-4">
                                    전한솔 원장
                                </h1>
                                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light italic">
                                    &quot;경청과 전문성으로 치유합니다. 공감과 과학적 정밀함에 뿌리를 둔 진료 철학을 실천합니다.&quot;
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                    <span className="text-sm font-semibold">정신건강의학과 전문의</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                                    <span className="material-symbols-outlined text-primary">translate</span>
                                    <span className="text-sm font-semibold">영어 진료 가능</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Philosophy Section */}
                    <section className="bg-primary text-white rounded-xl p-8 md:p-12 mb-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="material-symbols-outlined text-[160px]">format_quote</span>
                        </div>
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-white/40 inline-block"></span>
                                진료 철학
                            </h2>
                            <p className="text-lg md:text-xl leading-relaxed font-medium">
                                푸른솔 정신건강의학과에서는 정신건강이 단순히 질병의 부재가 아니라,
                                자신의 평화를 되찾아가는 여정이라고 믿습니다. 근거 중심의 임상 진료와
                                각 환자의 고유한 이야기를 이해하고자 하는 깊은 헌신을 결합하여,
                                치유와 성장을 위한 안전하고 비밀이 보장되는 숲과 같은 공간을 제공합니다.
                            </p>
                        </div>
                    </section>

                    {/* Credentials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        {/* Professional Experience */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-primary text-3xl">work_outline</span>
                                <h3 className="text-2xl font-bold tracking-tight">경력 사항</h3>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex gap-4 group">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                    <div>
                                        <p className="font-bold text-lg">푸른솔 정신건강의학과 대표원장</p>
                                        <p className="text-gray-500 text-sm">현재</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 group">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                    <div>
                                        <p className="font-bold text-lg">정신건강의학과 전문의 취득</p>
                                        <p className="text-gray-500 text-sm">대한민국 보건복지부</p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        {/* Academic Background */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-primary text-3xl">school</span>
                                <h3 className="text-2xl font-bold tracking-tight">학력</h3>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex gap-4 group">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                    <div>
                                        <p className="font-bold text-lg">서울대학교 졸업</p>
                                        <p className="text-gray-500 text-sm">학부</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 group">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                    <div>
                                        <p className="font-bold text-lg">건국대학교 의학전문대학원 졸업</p>
                                        <p className="text-gray-500 text-sm">석사</p>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>

                    {/* Credentials & Certifications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                                <h3 className="text-2xl font-bold tracking-tight">자격 및 수료</h3>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-4 group">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                    <p className="font-medium">학교응급심리지원 전문가 수료</p>
                                </li>
                                <li className="flex gap-4 group">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                    <p className="font-medium">대한 신경정신의학회 정회원</p>
                                </li>
                                <li className="flex gap-4 group">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                    <p className="font-medium">정서인지행동의학회 정회원</p>
                                </li>
                                <li className="flex gap-4 group">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0"></div>
                                    <p className="font-medium">한일 정신의학회 정회원</p>
                                </li>
                            </ul>
                        </section>

                        {/* Publications */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="material-symbols-outlined text-primary text-3xl">article</span>
                                <h3 className="text-2xl font-bold tracking-tight">논문 및 주요 발표</h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">주요 논문</p>
                                    <p className="font-bold text-lg mb-1">불면증으로 의뢰된 입원환자의 임상적 특징 및 협진 유형 분석</p>
                                    <p className="text-gray-500 text-sm">대한수면의학회, 수면 정신생리 25(2) : 68-73, 2018</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">국제 발표</p>
                                    <p className="font-bold mb-1">The Characteristics and Types of Psychiatric Consultation for Insomnia Symptom in Hospitalized Patients</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">학회 참가</p>
                                    <p className="font-bold mb-1">제 19회 한일정신의학회</p>
                                    <p className="text-gray-500 text-sm">(The 19th Korea-Japan Young Psychiatrist&apos;s Conference)</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">참가 및 정신 분석 치료 사례 발표 (한국 참가자 대표)</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Message Section */}
                    <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row gap-10 items-start mb-16">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-6 text-primary leading-tight">당신의 소중한 일상,<br className="md:hidden" /> 푸른솔이 함께 지키겠습니다</h3>
                            <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-6 mb-8">
                                <p>
                                    인생의 예기치 못한 소나기 속에 마음의 흉터가 깊어질 때가 있습니다.<br className="hidden md:block" />
                                    어디서부터 이야기를 시작해야 할지 몰라 망설여진다면,<br className="hidden md:block" />
                                    언제든 푸른솔의 문을 두드려 주세요.
                                </p>
                                <p className="font-medium text-gray-800 dark:text-gray-200">
                                    공감하며 듣겠습니다.<br />
                                    함께 상처를 들여다보겠습니다.<br />
                                    건강한 치유로 일상을 되찾아 드립니다.
                                </p>
                                <p className="font-bold text-primary text-lg">
                                    다시 시작될 당신의 빛나는 일상을<br className="md:hidden" /> 푸른솔정신건강의학과가 응원합니다.
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
                                    <span className="font-medium">월, 금</span>
                                    <span className="text-primary font-bold">10:00 - 19:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">화, 목</span>
                                    <span className="text-primary font-bold">10:00 - 20:00</span>
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
            </main>
            <Footer />
        </div>
    );
}
