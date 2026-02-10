export default function Hero() {
    return (
        <section className="relative pt-20">
            <div className="mx-auto max-w-[1440px] px-0">
                <div
                    className="relative min-h-[640px] flex items-center justify-center overflow-hidden rounded-b-[2rem] bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('/images/back2.png')`,
                    }}
                >
                    <div className="z-10 text-center px-6 max-w-3xl">
                        <span className="inline-block px-5 py-2 mb-6 text-base font-bold tracking-[0.1em] uppercase bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-full text-primary shadow-sm border border-white/20">
                            영어 진료 가능 · English Available
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[#111418] leading-[1.3] mb-6">
                            다시금 되찾을 <br />
                            <span className="text-primary underline decoration-sage-200 underline-offset-8">
                                당신의 일상
                            </span>
                            을 응원합니다
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 leading-snug mb-10 font-medium">
                            지친 마음을 쉬어갈 수 있는<br />
                            편안한 공간에서<br />
                            전문적인 정신건강 진료를 받아보세요.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+8228565557"
                                className="h-14 px-8 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] hover:bg-primary-hover transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">call</span>
                                전화 예약하기
                            </a>
                            <a
                                href="/about"
                                className="h-14 px-8 bg-white/80 backdrop-blur-md text-[#111418] font-bold rounded-xl border border-gray-200 hover:bg-white transition-all flex items-center justify-center"
                            >
                                의료진 소개
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
