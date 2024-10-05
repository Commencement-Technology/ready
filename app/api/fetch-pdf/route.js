import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const pdfUrl = await req.json();
    const response = await fetch(pdfUrl.url);
    if (!response.ok) {
      return NextResponse.json({
        message: "Error fetching the PDF",
      });
    }

    const data = await response.arrayBuffer();

    NextResponse.next().headers.set("Content-Type", "application/pdf");
    NextResponse.next().headers.set("Access-Control-Allow-Origin", "*");

    return NextResponse.json(Buffer.from(data), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { text: "Internal Server Error" },
      { status: 500 }
    );
  }
}
