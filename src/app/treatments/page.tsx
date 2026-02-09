import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
    title: "진료 과목 | 푸른솔 정신건강의학과",
    description: "우울증, 불안장애, ADHD, 스트레스, 공황장애, 불면증 전문 진료",
};

const treatments = [
    {
        id: "depression",
        icon: "mood",
        title: "우울증",
        titleEn: "Depression",
        description:
            "우울증은 지속적인 우울감과 흥미 상실을 특징으로 하는 심리적 장애입니다. 일상생활에 심각한 영향을 미칠 수 있어 전문적인 치료가 필요합니다.",
        symptoms: [
            { label: "정서적 증상", desc: "지속적인 우울감, 절망감, 무가치감, 죄책감" },
            { label: "신체적 증상", desc: "피로감, 수면장애, 식욕변화, 체중변화" },
            { label: "인지적 증상", desc: "집중력 저하, 기억력 감퇴, 부정적 사고" },
            { label: "행동적 증상", desc: "사회적 위축, 흥미 상실, 자살 사고" },
        ],
    },
    {
        id: "anxiety",
        icon: "air",
        title: "불안장애 / 공황장애",
        titleEn: "Anxiety / Panic Disorder",
        description:
            "불안장애는 과도하고 지속적인 걱정과 불안을 특징으로 하며, 다양한 형태로 나타날 수 있습니다. 공황장애는 예측할 수 없는 공황발작이 반복적으로 발생합니다.",
        symptoms: [
            { label: "심장 증상", desc: "심계항진, 심장이 빠르게 뛰는 느낌" },
            { label: "호흡 증상", desc: "숨이 막히는 느낌, 호흡곤란" },
            { label: "신체 증상", desc: "떨림, 발한, 오한, 열감" },
            { label: "정신 증상", desc: "죽을 것 같은 공포, 통제력 상실감" },
        ],
    },
    {
        id: "adhd",
        icon: "bolt",
        title: "ADHD",
        titleEn: "Attention Deficit Hyperactivity Disorder",
        description:
            "ADHD는 주의력 부족, 과잉행동, 충동성을 특징으로 하는 신경발달장애입니다. 아동기에 시작되어 성인기까지 지속될 수 있습니다.",
        symptoms: [
            { label: "주의력 부족", desc: "세부사항 놓침, 지속적 주의 어려움, 조직화 어려움" },
            { label: "과잉행동", desc: "안절부절함, 과도한 활동, 조용히 앉아있기 어려움" },
            { label: "충동성", desc: "성급한 행동, 차례 기다리기 어려움, 방해하기" },
            { label: "학습/직업 문제", desc: "학업 성취도 저하, 직장에서의 어려움" },
        ],
    },
    {
        id: "insomnia",
        icon: "dark_mode",
        title: "불면증",
        titleEn: "Insomnia",
        description:
            "불면증은 충분한 수면을 취하지 못하거나 수면의 질이 떨어져서 낮 동안의 기능에 문제를 일으키는 수면장애입니다.",
        symptoms: [
            { label: "수면 시작 어려움", desc: "잠들기까지 오랜 시간이 걸림" },
            { label: "수면 유지 어려움", desc: "자주 깨거나 너무 일찍 깸" },
            { label: "수면의 질 저하", desc: "숙면을 취하지 못함, 개운하지 않음" },
            { label: "낮 시간 증상", desc: "낮 동안 피로감, 집중력 저하" },
        ],
    },
    {
        id: "stress",
        icon: "self_improvement",
        title: "스트레스",
        titleEn: "Stress Management",
        description:
            "현대인의 일상에서 스트레스는 불가피하지만, 과도한 스트레스는 신체적, 정신적 건강에 해로운 영향을 미칩니다.",
        symptoms: [
            { label: "지속적 노출", desc: "지속적인 스트레스 상황 노출" },
            { label: "피로감", desc: "신체적, 정서적 피로감" },
            { label: "집중력/정서", desc: "집중력 저하, 불안, 우울감" },
            { label: "신체 증상", desc: "수면장애, 두통, 소화불량 등" },
        ],
    },
];

export default function TreatmentsPage() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero Section */}
                <section className="relative h-[300px] flex items-center justify-center overflow-hidden bg-primary/5">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 2px 2px, #2F5C56 1px, transparent 0)",
                            backgroundSize: "40px 40px",
                        }}
                    ></div>
                    <div className="relative z-10 max-w-[960px] text-center px-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
                            전문 진료 프로그램
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            정신 건강과 장기적인 회복력을 위한 맞춤형 근거 기반 치료 계획을
                            제공합니다.
                        </p>
                    </div>
                </section>

                {/* Category Navigation */}
                <div className="sticky top-20 z-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                    <div className="max-w-[960px] mx-auto px-2 md:px-4 flex overflow-x-auto gap-2 md:gap-6 items-center py-2 scrollbar-hide">
                        {treatments.map((t, idx) => (
                            <a
                                key={t.id}
                                href={`#${t.id}`}
                                className={`flex-shrink-0 border-b-2 ${idx === 0 ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-primary"
                                    } py-2 md:py-3 px-2 md:px-3 transition-all`}
                            >
                                <span className="text-xs md:text-sm font-bold tracking-wide whitespace-nowrap">{t.title}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Treatment Sections */}
                <div className="max-w-[960px] mx-auto w-full py-16 px-4 flex flex-col gap-24">
                    {treatments.map((treatment) => (
                        <section key={treatment.id} id={treatment.id} className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="material-symbols-outlined text-4xl text-primary">
                                    {treatment.icon}
                                </span>
                                <h2 className="text-3xl font-extrabold text-primary">
                                    {treatment.title}
                                </h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <p className="text-sm text-primary font-semibold uppercase tracking-wider">
                                        {treatment.titleEn}
                                    </p>
                                    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                        {treatment.description}
                                    </p>
                                    <a
                                        href="tel:+8228565557"
                                        className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        <span className="material-symbols-outlined text-sm">call</span>
                                        상담 예약하기
                                    </a>
                                </div>
                                <div className="bg-sage-50/50 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
                                    <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">symptoms</span>
                                        주요 증상
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {treatment.symptoms.map((symptom, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-white dark:bg-gray-800 p-3 rounded-lg border-l-4 border-primary shadow-sm"
                                            >
                                                <p className="font-bold text-primary text-sm mb-1">
                                                    {symptom.label}
                                                </p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                                    {symptom.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="px-6 md:px-20 py-20 bg-primary">
                    <div className="max-w-[1000px] mx-auto text-center text-white space-y-6">
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                            치유를 시작할 준비가 되셨나요?
                        </h2>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
                            혼자서 짐을 짊어지지 않아도 됩니다. 오늘 예약하시고 더 밝은 내일을
                            향한 첫 걸음을 내딛으세요.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                            <a
                                href="tel:+8228565557"
                                className="h-14 px-10 bg-white text-primary rounded-full font-extrabold text-lg hover:bg-gray-100 transition-colors shadow-xl flex items-center justify-center"
                            >
                                전화 예약하기
                            </a>
                            <Link
                                href="/guide"
                                className="h-14 px-10 bg-primary/20 border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center"
                            >
                                진료 안내 보기
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
