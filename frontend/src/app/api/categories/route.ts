import { NextRequest, NextResponse } from "next/server";
import http from "node:http";
import type { Category } from "@/lib/catalog";

function queryBackend(name: string): Promise<Category[]> {
  const body = JSON.stringify({ name });
  return new Promise((resolve, reject) => {
    const backendRequest = http.request({ hostname: "localhost", port: 8080, path: "/categories", method: "GET", headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) } }, (response) => {
      let data = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => { data += chunk; });
      response.on("end", () => response.statusCode === 200 ? resolve(JSON.parse(data || "[]")) : reject(new Error(data)));
    });
    backendRequest.on("error", reject);
    backendRequest.write(body);
    backendRequest.end();
  });
}

export async function GET(request: NextRequest) {
  try {
    const name = request.nextUrl.searchParams.get("name")?.trim();
    if (name) return NextResponse.json(await queryBackend(name));
    const results = await Promise.all("abcdefghijklmnopqrstuvwxyz0123456789".split("").map(queryBackend));
    const unique = new Map(results.flat().map((category) => [category.categoryId, category]));
    return NextResponse.json([...unique.values()].filter((category) => category.ativo).sort((a, b) => a.name.localeCompare(b.name, "pt-BR")));
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Erro ao carregar categorias" }, { status: 502 });
  }
}
