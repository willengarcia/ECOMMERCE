"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ImageOff } from "lucide-react";
import MenuInferior from "../../navegador/nav";
import { listProductsByCategory } from "@/lib/api";
import { money, Product, productImage, salePrice } from "@/lib/catalog";

export default function ProdutosDaCategoria() {
  const { id } = useParams<{ id: string }>(); const router = useRouter(); const search = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]); const [error, setError] = useState("");
  useEffect(() => { listProductsByCategory(Number(id)).then(setProducts).catch((reason) => setError(reason.message)); }, [id]);
  return <div className="app-shell"><header className="flex items-center gap-3 px-5 py-6"><button onClick={() => router.back()}><ArrowLeft /></button><div><p className="text-sm text-slate-500">Categoria</p><h1 className="text-2xl font-black">{search.get("name") ?? `Categoria ${id}`}</h1></div></header><main className="grid grid-cols-2 gap-5 px-5">{error && <p className="col-span-2 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}{!error && !products.length && <p className="col-span-2">Nenhum produto nesta categoria.</p>}{products.map((product) => { const image = productImage(product); return <Link key={product.id} href={`/produto/${product.id}`}>{image ? <img src={image} alt={product.nome} className="aspect-square w-full rounded-2xl object-cover" /> : <div className="grid aspect-square place-items-center rounded-2xl bg-slate-200 text-slate-500"><ImageOff /></div>}<h2 className="mt-2 font-semibold">{product.nome}</h2><p className="text-sm text-slate-500">{money(salePrice(product))}</p></Link>; })}</main><MenuInferior /></div>;
}
