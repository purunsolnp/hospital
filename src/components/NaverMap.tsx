"use client";

import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        naver: any;
    }
}

interface NaverMapProps {
    latitude?: number;
    longitude?: number;
    zoom?: number;
}

export default function NaverMap({
    latitude = 37.48427,
    longitude = 126.8949,
    zoom = 16,
}: NaverMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if script already exists
        const existingScript = document.querySelector('script[src*="oapi.map.naver.com"]');

        const initMap = () => {
            if (!window.naver || !window.naver.maps) {
                // Retry after a short delay - API might still be initializing
                setTimeout(initMap, 300);
                return;
            }

            if (!mapRef.current) return;

            try {
                const mapOptions = {
                    center: new window.naver.maps.LatLng(latitude, longitude),
                    zoom: zoom,
                    zoomControl: true,
                    zoomControlOptions: {
                        position: window.naver.maps.Position.TOP_RIGHT,
                    },
                };

                const map = new window.naver.maps.Map(mapRef.current, mapOptions);

                // Marker
                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(latitude, longitude),
                    map: map,
                });

                // Info Window
                const infoWindow = new window.naver.maps.InfoWindow({
                    content: `
                        <div style="
                            padding: 12px 16px;
                            font-family: 'Pretendard', sans-serif;
                            min-width: 180px;
                        ">
                            <p style="font-weight: bold; font-size: 14px; color: #2f5c56; margin: 0 0 8px 0;">
                                푸른솔 정신건강의학과
                            </p>
                            <p style="font-size: 12px; color: #666; margin: 0; line-height: 1.5;">
                                서울특별시 구로구 디지털로 285<br/>
                                에이스트윈타워 203호
                            </p>
                            <a href="https://map.naver.com/p/entry/place/1926877701" 
                               target="_blank"
                               style="
                                   display: inline-block;
                                   margin-top: 8px;
                                   font-size: 11px;
                                   color: #2f5c56;
                                   text-decoration: underline;
                               ">
                                네이버 지도에서 보기 →
                            </a>
                        </div>
                    `,
                    borderWidth: 0,
                    backgroundColor: "white",
                    anchorSize: new window.naver.maps.Size(10, 10),
                });

                infoWindow.open(map, marker);
                setError(null);
                setIsLoaded(true);

            } catch (e) {
                console.error("Map initialization error:", e);
                setError("지도 로딩 중...");
            }
        };

        if (existingScript) {
            if (window.naver && window.naver.maps) {
                initMap();
            } else {
                existingScript.addEventListener("load", () => {
                    setTimeout(initMap, 200);
                });
            }
        } else {
            const script = document.createElement("script");
            script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=isu7oagull`;
            script.async = true;

            script.onload = () => {
                setTimeout(initMap, 200);
            };
            script.onerror = () => {
                setError("지도 API 로딩 실패");
            };

            document.head.appendChild(script);
        }
    }, [latitude, longitude, zoom]);

    return (
        <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden relative">
            {/* Map container - always rendered */}
            <div
                ref={mapRef}
                className="absolute inset-0"
                style={{ minHeight: "400px", height: "100%" }}
            />

            {/* Fallback overlay - hidden when map loads */}
            {!isLoaded && (
                <div
                    className="absolute inset-0 bg-gradient-to-br from-sage-100 to-primary/10 dark:from-gray-800 dark:to-primary/20 flex flex-col items-center justify-center cursor-pointer group z-10"
                    onClick={() => window.open('https://map.naver.com/p/entry/place/1926877701', '_blank')}
                >
                    {/* Location Pin */}
                    <div className="bg-primary text-white p-4 rounded-full shadow-2xl mb-4 transform group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-4xl">location_on</span>
                    </div>

                    {/* Hospital Name */}
                    <div className="bg-primary text-white px-6 py-3 rounded-xl shadow-lg mb-4">
                        <p className="font-bold text-lg">푸른솔 정신건강의학과</p>
                    </div>

                    {/* Address */}
                    <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-md text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                            서울특별시 구로구 디지털로 285
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                            에이스트윈타워 203호
                        </p>
                    </div>

                    {/* Click hint */}
                    <div className="mt-4 flex items-center gap-2 text-primary font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        <span className="text-sm">클릭하여 네이버 지도 열기</span>
                    </div>
                </div>
            )}
        </div>
    );
}

