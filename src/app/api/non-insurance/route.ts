import { NextResponse } from "next/server";

// Google Sheets CSV URL
const SHEETS_URL =
    "https://docs.google.com/spreadsheets/d/1lueiZJU_XUOypuiie8-GczNT-CyLYbpTDACpXHW0xbM/export?format=csv";

export interface NonInsuranceItem {
    category: string;
    code: string;
    description: string;
    price: string;
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

        // Transform to NonInsuranceItem
        // Columns: 분류, 코드, 상세내역, 금액
        const items: NonInsuranceItem[] = rawData
            .map((row) => ({
                category: row["분류"] || "",
                code: row["코드"] || "",
                description: row["상세내역"] || row["상세 내역"] || "",
                price: row["금액"] || "",
            }))
            .filter(item => item.description || item.price); // Filter out empty rows

        return NextResponse.json({ items, success: true });
    } catch (error) {
        console.error("Error fetching non-insurance items:", error);
        return NextResponse.json(
            { items: [], success: false, error: String(error) },
            { status: 500 }
        );
    }
}
