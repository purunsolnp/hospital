import Link from "next/link";

const services = [
    {
        icon: "filter_drama",
        title: "우울증",
        titleEn: "Depression",
        description: "일상의 활력을 되찾을 수 있도록 맞춤형 치료를 제공합니다.",
    },
    {
        icon: "psychology",
        title: "불안장애",
        titleEn: "Anxiety",
        description: "불안에서 벗어나 편안한 마음을 되찾도록 도와드립니다.",
    },
    {
        icon: "child_care",
        title: "ADHD",
        titleEn: "Attention Deficit",
        description: "집중력 향상을 위한 전문적인 진단과 치료를 받으세요.",
    },
    {
        icon: "bedtime",
        title: "불면증",
        titleEn: "Insomnia",
        description: "숙면을 위한 맞춤형 수면 클리닉을 운영합니다.",
    },
    {
        icon: "favorite",
        title: "공황장애",
        titleEn: "Panic Disorder",
        description: "갑작스러운 공포감을 관리하고 극복하는 방법을 배웁니다.",
    },
    {
        icon: "sentiment_stressed",
        title: "스트레스",
        titleEn: "Stress",
        description: "현대 사회의 스트레스를 효과적으로 관리하세요.",
    },
];

export default function Services() {
    return (
        <section className="bg-sage-50 dark:bg-gray-900/50 py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm">
                        진료 과목
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        전문적인 정신건강 진료
                    </h3>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        개인의 상황과 필요에 맞춘 종합적인 정신건강 서비스를 제공합니다.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="group bg-white dark:bg-background-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 bg-sage-50 dark:bg-sage-600/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">
                                    {service.icon}
                                </span>
                            </div>
                            <h4 className="text-xl font-bold mb-1">{service.title}</h4>
                            <p className="text-xs text-primary font-semibold mb-3">
                                {service.titleEn}
                            </p>
                            <p className="text-[15.5px] text-gray-500 leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <Link
                                href="/treatments"
                                className="text-xs font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all"
                            >
                                자세히 보기{" "}
                                <span className="material-symbols-outlined text-sm">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
