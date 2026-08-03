import { NextRequest, NextResponse } from "next/server";
import { site } from "@/lib/config";
import { orderStats } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== site.adminPassword) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const stats = await orderStats();
  return NextResponse.json({ stats });
}
