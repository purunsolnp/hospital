import { NextResponse } from "next/server";

// Google Sheets CSV URL (same as notices)
const SHEETS_URL =
    "https://docs.google.com/spreadsheets/d/1UbfL8PgO-KtRy7RqsQeNhixLTRFUnUiOFmaGmu0IV7w/export?format=csv";

export interface CalendarEvent {
    title: string;
    start: string;
    end?: string;
    allDay: boolean;
    color: string;
    category?: string;
}

const COLOR_MAP: Record<string, string> = {
    휴진: "#ff6b6b",
    학회: "#4dabf7",
    단축진료: "#ffa94d",
    진료: "#4dabf7",
    기타: "#cccccc",
};

function parseCSV(csvText: string): Record<string, string>[] {
    const lines = csvText.split("\n");
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const data: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = parseCSVLine(line);
        const row: Record<string, string> = {};

        headers.forEach((header, index) => {
            row[header.trim()] = values[index]?.trim() || "";
        });

        data.push(row);
    }

    return data;
}

function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            result.push(current);
            current = "";
        } else {
            current += char;
        }
    }

    result.push(current);
    return result;
}

function parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
}

function formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
}

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function getWeekdayNumber(weekday: string): number | null {
    const map: Record<string, number> = {
        월요일: 1,
        화요일: 2,
        수요일: 3,
        목요일: 4,
        금요일: 5,
        토요일: 6,
        일요일: 0,
    };
    return map[weekday] ?? null;
}

export async function GET() {
    try {
        const response = await fetch(SHEETS_URL, {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const csvText = await response.text();
        const rawData = parseCSV(csvText);

        const events: CalendarEvent[] = [];
        const today = new Date();
        const maxDate = new Date(2099, 0, 1);

        // Parse exception dates
        const parseExceptionDates = (exceptStr: string): Set<string> => {
            const dates = new Set<string>();
            if (!exceptStr) return dates;
            exceptStr.split(",").forEach((d) => {
                const trimmed = d.trim();
                if (trimmed) dates.add(trimmed);
            });
            return dates;
        };

        for (const row of rawData) {
            const repeat = row["반복"]?.trim() || "";
            const weekday = row["요일"]?.trim() || "";
            const category = row["카테고리"]?.trim() || "기타";
            const doctor = row["의사명"]?.trim() || "";
            const titleBase = row["제목"]?.trim() || "일정";
            const title = doctor
                ? `${doctor} ${category}: ${titleBase}`
                : `${category}: ${titleBase}`;
            const color = COLOR_MAP[category] || COLOR_MAP["기타"];

            const startDate = parseDate(row["날짜"]);
            const endDate = parseDate(row["종료일"]) || maxDate;
            const exceptionDates = parseExceptionDates(row["예외일"] || "");

            // Weekly repeat
            if ((repeat === "매주" || repeat === "WEEKLY") && weekday) {
                const weekdayNum = getWeekdayNumber(weekday);
                if (weekdayNum !== null) {
                    let d = startDate || today;
                    const limitDate = new Date(today);
                    limitDate.setFullYear(limitDate.getFullYear() + 1); // Limit to 1 year

                    while (d <= endDate && d <= limitDate) {
                        if (
                            d.getDay() === weekdayNum &&
                            !exceptionDates.has(formatDate(d))
                        ) {
                            events.push({ title, start: formatDate(d), allDay: true, color, category });
                        }
                        d = addDays(d, 1);
                    }
                }
                continue;
            }

            // Single/range event
            if (startDate) {
                const event: CalendarEvent = {
                    title,
                    start: formatDate(startDate),
                    allDay: true,
                    color,
                    category,
                };

                if (row["종료일"] && parseDate(row["종료일"])) {
                    // Add 1 day to end date for FullCalendar range display
                    event.end = formatDate(addDays(parseDate(row["종료일"])!, 1));
                }

                events.push(event);
            }
        }

        return NextResponse.json({ events, success: true });
    } catch (error) {
        console.error("Error fetching calendar:", error);
        return NextResponse.json(
            { events: [], success: false, error: String(error) },
            { status: 500 }
        );
    }
}
