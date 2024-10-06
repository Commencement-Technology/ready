import { pinata } from "@/utils/config";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req, res) {
  try {
    const data = await req.json();
    const url = await pinata.gateways.createSignedURL({
      cid: data.cid,
      expires: 500000, // 138 hours
    });
    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: "Error creating API Key:" },
      { status: 500 }
    );
  }
}
