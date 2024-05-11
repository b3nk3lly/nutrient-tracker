import { NextRequest, NextResponse } from "next/server";
import ReportData from "../../types/reportData";

export async function POST(request: NextRequest) {
	const data: ReportData = await request.json();

	return NextResponse.json({ status: 200 });
}
