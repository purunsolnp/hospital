export default function Hours() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                {/* Schedule Card */}
                <div className="bg-white dark:bg-gray-900 p-10 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-lg">
                    <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">
                        진료 시간
                    </h2>
                    <h3 className="text-3xl font-extrabold tracking-tight mb-8">
                        Office Hours
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                            <span className="font-semibold">월요일 (Mon)</span>
                            <span className="text-gray-600">10:00 ~ 19:00</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                            <span className="font-semibold">화요일 (Tue)</span>
                            <span className="text-gray-600">10:00 ~ 20:00</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                            <span className="font-semibold text-gray-400">수요일 (Wed)</span>
                            <span className="text-red-400 font-semibold">휴진</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                            <span className="font-semibold">목요일 (Thu)</span>
                            <span className="text-gray-600">10:00 ~ 20:00</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                            <span className="font-semibold">금요일 (Fri)</span>
                            <span className="text-gray-600">10:00 ~ 19:00</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                            <span className="font-semibold">토요일 (Sat)</span>
                            <span className="text-gray-600">10:00 ~ 13:00</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="font-semibold text-gray-400">일요일 · 공휴일</span>
                            <span className="text-red-400 font-semibold">휴진</span>
                        </div>
                    </div>
                </div>

                {/* Appointment Info */}
                <div className="flex flex-col gap-8">
                    <div className="space-y-4">
                        <h2 className="text-primary font-bold tracking-widest uppercase text-sm">
                            예약 안내
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            초진 및 재진 예약
                        </h3>
                    </div>

                    {/* First Visit */}
                    <div className="flex items-start gap-5 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                            <span className="material-symbols-outlined">call</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">초진 예약</h4>
                            <p className="text-sm text-gray-500 mb-3">
                                처음 방문하시는 분은 전화로만 예약 가능합니다.
                            </p>
                            <a
                                href="tel:+8228565557"
                                className="inline-flex items-center gap-2 text-primary font-bold text-lg"
                            >
                                📞 02-856-5557
                            </a>
                        </div>
                    </div>

                    {/* Follow-up Visit */}
                    <div className="flex items-start gap-5 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="p-3 bg-sage-100 text-primary rounded-xl">
                            <span className="material-symbols-outlined">smartphone</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">재진 예약</h4>
                            <p className="text-sm text-gray-500 mb-3">
                                재방문 시 &apos;아임파인&apos; 앱을 통해 예약하실 수 있습니다.
                            </p>
                            <div className="flex gap-3">
                                <a
                                    href="https://play.google.com/store/apps/details?id=io.lokks.careease&hl=ko"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    📱 Android
                                </a>
                                <a
                                    href="https://apps.apple.com/kr/app/%EC%95%84%EC%9E%84%ED%8C%8C%EC%9D%B8-im-fine/id1573100943"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    🍎 iOS
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
