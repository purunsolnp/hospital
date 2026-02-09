"use client";

import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        kakao: any;
    }
}

interface KakaoMapProps {
    latitude?: number;
    longitude?: number;
    level?: number;
}

export default function KakaoMap({
    latitude = 37.48427,
    longitude = 126.8949,
    level = 3,
}: KakaoMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if script already exists
        const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');

        const initMap = () => {
            if (!window.kakao || !window.kakao.maps) {
                setError("카카오맵 API를 불러오지 못했습니다.");
                return;
            }

            window.kakao.maps.load(() => {
                if (!mapRef.current) return;

                try {
                    const options = {
                        center: new window.kakao.maps.LatLng(latitude, longitude),
                        level: level,
                    };

                    const map = new window.kakao.maps.Map(mapRef.current, options);

                    // Marker
                    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                        map: map,
                    });

                    // Custom Overlay
                    const overlayContent = document.createElement("div");
                    overlayContent.innerHTML = `
                        <div style="
                            background: #2f5c56;
                            color: #fff;
                            font-weight: bold;
                            border-radius: 10px;
                            padding: 8px 16px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                            font-size: 0.9rem;
                            text-align: center;
                            cursor: pointer;
                            white-space: nowrap;
                        ">
                            푸른솔 정신건강의학과
                        </div>
                    `;
                    overlayContent.onclick = () => {
                        window.open('https://map.naver.com/p/entry/place/1926877701', '_blank');
                    };

                    const customOverlay = new window.kakao.maps.CustomOverlay({
                        position: markerPosition,
                        content: overlayContent,
                        yAnchor: 1.5,
                    });
                    customOverlay.setMap(map);

                    setIsLoaded(true);
                } catch (e) {
                    console.error("Map initialization error:", e);
                    setError("지도를 초기화하는데 실패했습니다.");
                }
            });
        };

        if (existingScript) {
            // Script already loaded, just init map
            if (window.kakao && window.kakao.maps) {
                initMap();
            } else {
                existingScript.addEventListener("load", initMap);
            }
        } else {
            // Load script
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=91eaaa2762fceb977224270662d65d0f&autoload=false`;
            script.async = true;

            script.onload = initMap;
            script.onerror = () => {
                setError("카카오맵 스크립트를 불러오지 못했습니다.");
            };

            document.head.appendChild(script);
        }
    }, [latitude, longitude, level]);

    if (error) {
        return (
            <div className="w-full h-full min-h-[400px] rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <span className="material-symbols-outlined text-4xl mb-2 block">map</span>
                    <p className="text-sm">{error}</p>
                    <a
                        href="https://map.naver.com/p/entry/place/1926877701"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline text-sm mt-2 inline-block"
                    >
                        네이버 지도에서 보기
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={mapRef}
            className="w-full h-full min-h-[400px] rounded-xl bg-gray-100"
            style={{ minHeight: "400px", height: "100%" }}
        />
    );
}
