"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Grid2X2 } from "lucide-react";
import MenuInferior from "../navegador/nav";
import { listCategories } from "@/lib/api";
import type { Category } from "@/lib/catalog";

export default function Categorias() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => { listCategories().then(setCategories).catch((reason) => setError(reason.message)).finally(() => setLoading(false)); }, []);
  return <div className="app-shell"><header className="px-5 pb-5 pt-8"><p className="text-sm text-slate-500">Navegue pelo catálogo</p><h1 className="text-3xl font-black">Categorias</h1></header><main className="space-y-3 px-5">{loading && <p className="text-slate-500">Carregando categorias...</p>}{error && <p className="rounded-xl bg-red-50 p-4 text-red-700">Erro do backend: {error}</p>}{!loading && !error && !categories.length && <p>Nenhuma categoria ativa encontrada.</p>}{categories.map((category) => <Link key={category.categoryId} href={`/categorias/${category.categoryId}?name=${encodeURIComponent(category.name)}`} className="card flex items-center gap-4 p-4"><span className="grid size-12 place-items-center rounded-xl bg-blue-100 text-blue-600"><Grid2X2 /></span><span className="min-w-0 flex-1"><b className="block text-lg">{category.name}</b><small className="text-slate-500">{category.description}</small></span><ArrowRight className="text-slate-400" /></Link>)}</main><MenuInferior /></div>;
}

