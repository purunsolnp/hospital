"use client";

import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

interface CalendarEvent {
    title: string;
    start: string;
    end?: string;
    allDay: boolean;
    color: string;
    category?: string;
}

export default function Calendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCalendar() {
            try {
                const res = await fetch("/api/calendar");
                const data = await res.json();
                if (data.success) {
                    setEvents(data.events);
                } else {
                    setError("일정을 불러오는데 실패했습니다.");
                }
            } catch (err) {
                setError("서버 연결에 실패했습니다.");
            } finally {
                setLoading(false);
            }
        }
        fetchCalendar();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                <span className="ml-4 text-gray-500">일정을 불러오는 중...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
                <p className="text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">warning</span>
                    {error}
                </p>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-12 text-center">
                <span className="material-symbols-outlined text-5xl text-gray-400 mb-4">
                    calendar_today
                </span>
                <p className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                    📅 현재 등록된 일정이 없습니다.
                </p>
                <p className="text-gray-500">
                    휴진, 학회, 단축진료 등의 일정이 등록되면 이곳에 표시됩니다.
                </p>
            </div>
        );
    }

    return (
        <div className="calendar-wrapper bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locale="ko"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                }}
                events={events}
                height="auto"
                eventDisplay="block"
                eventTimeFormat={{
                    hour: "numeric",
                    minute: "2-digit",
                    meridiem: false,
                }}
                dayMaxEvents={3}
                moreLinkText={(num) => `+${num}개`}
            />
            <style jsx global>{`
        .fc {
          font-family: "Manrope", sans-serif;
        }
        .fc .fc-toolbar-title {
          font-size: 1.25rem;
          font-weight: 700;
        }
        .fc .fc-button-primary {
          background-color: #2f5c56;
          border-color: #2f5c56;
        }
        .fc .fc-button-primary:hover {
          background-color: #244944;
          border-color: #244944;
        }
        .fc .fc-button-primary:disabled {
          background-color: #2f5c56;
          border-color: #2f5c56;
          opacity: 0.5;
        }
        .fc .fc-daygrid-day-number {
          font-weight: 600;
          color: #111418;
        }
        .fc .fc-daygrid-day.fc-day-today {
          background-color: rgba(47, 92, 86, 0.08);
        }
        .fc .fc-event {
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 4px;
        }
        .fc .fc-col-header-cell-cushion {
          font-weight: 700;
          color: #2f5c56;
        }
        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: #e5e7eb;
        }
        @media (prefers-color-scheme: dark) {
          .fc .fc-daygrid-day-number {
            color: #e5e7eb;
          }
          .fc-theme-standard td,
          .fc-theme-standard th {
            border-color: #374151;
          }
        }
      `}</style>
        </div>
    );
}
