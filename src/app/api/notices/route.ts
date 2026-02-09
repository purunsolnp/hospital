import { NextResponse } from "next/server";

// Google Sheets CSV URL
const SHEETS_URL =
    "https://docs.google.com/spreadsheets/d/1UbfL8PgO-KtRy7RqsQeNhixLTRFUnUiOFmaGmu0IV7w/export?format=csv";

export interface NoticeData {
    id: number;
    title: string;
    content: string;
    date: string;
    endDate?: string;
    repeat?: string;
    weekday?: string;
    category?: string;
    visible: boolean;
    pinned: boolean;
    doctor?: string;
}

function parseCSV(csvText: string): Record<string, string>[] {
    const lines = csvText.split("\n");
    if (lines.length < 2) return [];

    // Parse header
    const headers = parseCSVLine(lines[0]);

    // Parse data rows
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

function cleanContent(content: string): string {
    if (!content) return "";
    // Replace multiple consecutive newlines with single newline
    return content.replace(/(\n\s*){2,}/g, "\n").trim();
}

function isVisible(value: string): boolean {
    if (!value) return true; // Empty means visible
    const upper = value.toUpperCase();
    return ["TRUE", "", "Y", "YES", "1"].includes(upper);
}

function isPinned(value: string): boolean {
    if (!value) return false;
    const upper = value.toUpperCase();
    return ["TRUE", "Y", "YES", "1"].includes(upper);
}

export async function GET() {
    try {
        const response = await fetch(SHEETS_URL, {
            next: { revalidate: 60 }, // Cache for 60 seconds
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }

        const csvText = await response.text();
        const rawData = parseCSV(csvText);

        // Transform to NoticeData
        const notices: NoticeData[] = rawData
            .filter((row) => isVisible(row["공지노출"]))
            .map((row) => ({
                id: parseInt(row["ID"]) || 0,
                title: row["제목"] || "제목 없음",
                content: cleanContent(row["내용"] || ""),
                date: row["날짜"] || "",
                endDate: row["종료일"] || undefined,
                repeat: row["반복"] || undefined,
                weekday: row["요일"] || undefined,
                category: row["카테고리"] || undefined,
                visible: isVisible(row["공지노출"]),
                pinned: isPinned(row["상단고정"]),
                doctor: row["의사명"] || undefined,
            }))
            .sort((a, b) => {
                // Pinned first, then by ID ascending
                if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
                return a.id - b.id;
            });

        return NextResponse.json({ notices, success: true });
    } catch (error) {
        console.error("Error fetching notices:", error);
        return NextResponse.json(
            { notices: [], success: false, error: String(error) },
            { status: 500 }
        );
    }
}
