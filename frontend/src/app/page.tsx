"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, FlaskConical, ImageOff, Search, SlidersHorizontal, ShoppingCart, UserRound, X } from "lucide-react";
import MenuInferior from "./navegador/nav";
import AuthModal from "./components/auth-modal";
import { getProductMainImage, getProductsPage, listCategories, listProductsByCategory, listProductsByPrice, searchCategories } from "@/lib/api";
import { Category, money, Product, productImage, salePrice } from "@/lib/catalog";
import { getAuthProfile, isAuthenticated } from "@/lib/session";

function ProductPicture({ product }: { product: Product }) {
  const initialImage = productImage(product);
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(!initialImage);
  useEffect(() => { let active = true; if (!initialImage) getProductMainImage(product.id).then((url) => { if (active) setImage(url); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [initialImage, product.id]);
  return image ? (
    <img src={image} alt={product.nome} loading="lazy" decoding="async" className="aspect-square w-full rounded-xl object-contain p-2 transition duration-300 group-hover:scale-[1.02]" />
  ) : loading ? (
    <div className="skeleton aspect-square w-full rounded-xl" />
  ) : (
    <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl bg-slate-100 text-slate-400">
      <ImageOff />
      <span className="px-3 text-center text-xs">Imagem não informada pelo backend</span>
    </div>
  );
}

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [priceDescending, setPriceDescending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [authOpen, setAuthOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loggedIn = isAuthenticated(); setAuthenticated(loggedIn); if (loggedIn) setUserName(getAuthProfile().nome);
    void loadPage(0);
    void listCategories().then(setCategories).catch(() => undefined);
  }, []);

  async function loadPage(page: number) {
    setLoading(true); setError("");
    try {
      const result = await getProductsPage(page, 12);
      setProducts(result.content); setAllProducts(result.content); setCurrentPage(result.number);
      setTotalPages(result.totalPages);
      setCategoryId(""); setPriceDescending(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Erro ao carregar página"); }
    finally { setLoading(false); }
  }

  const visible = useMemo(
    () => products.filter((product) => `${product.nome} ${product.descricaoCurta}`.toLowerCase().includes(query.toLowerCase())),
    [products, query],
  );

  async function filterByPrice() {
    setLoading(true); setError("");
    try { setProducts(await listProductsByPrice()); setPriceDescending(true); setCategoryId(""); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Erro ao ordenar produtos"); }
    finally { setLoading(false); }
  }

  async function filterByCategory(value: string) {
    setCategoryId(value); setPriceDescending(false); setLoading(true); setError("");
    try { setProducts(value ? await listProductsByCategory(Number(value)) : allProducts); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Erro ao filtrar categoria"); }
    finally { setLoading(false); }
  }

  async function findCategories() {
    if (!categorySearch.trim()) return;
    setError("");
    try { setCategories(await searchCategories(categorySearch)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Erro ao buscar categorias"); }
  }

  function clearFilters() { void loadPage(0); setFiltersOpen(false); }

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 px-5 pb-4 pt-5 backdrop-blur">
        <div className="flex items-center justify-between">
        <div><p className="text-[11px] font-medium text-slate-500">E-commerce • Ambiente de testes</p><div className="mt-0.5 flex items-center gap-2"><h1 className="text-2xl font-black tracking-tight text-blue-700">TechSkill</h1><span className="env-badge">HOMOLOGAÇÃO</span></div></div>
        <div className="flex items-center gap-2">
          {authenticated ? <Link href="/perfil" className="flex max-w-32 items-center gap-2 rounded-xl px-2 py-1.5 text-left text-xs font-semibold text-slate-700"><UserRound size={20} className="text-blue-600" /><span className="truncate">{userName}</span></Link> : <button onClick={() => setAuthOpen(true)} className="rounded-xl px-3 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50">Entrar</button>}
          <Link href="/carrinho" aria-label="Abrir carrinho" className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm"><ShoppingCart size={21} /></Link>
        </div>
        </div>
        <label className="mt-4 flex h-12 items-center rounded-xl bg-slate-100 px-3 ring-blue-200 focus-within:bg-white focus-within:ring-2"><Search className="text-slate-400" size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" placeholder="Buscar produtos, marcas e muito mais..." /></label>
      </header>

      <div className="mx-5 mb-4 flex items-start gap-2.5 homolog-banner"><FlaskConical size={17} className="mt-0.5 shrink-0 text-blue-600" /><p><b className="block text-slate-700">Ambiente de homologação</b>Dados e operações utilizados exclusivamente para testes.</p></div>

      <div className="relative px-5 pb-5">
        <div className="flex gap-3">
          <div className="flex h-13 flex-1 items-center overflow-x-auto rounded-xl bg-white px-2 shadow-sm">{categories.slice(0, 6).map((category) => <button key={category.categoryId} onClick={() => void filterByCategory(String(category.categoryId))} className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${categoryId === String(category.categoryId) ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{category.name}</button>)}</div>
          <button onClick={() => setFiltersOpen((open) => !open)} aria-label="Abrir filtros" className={`grid size-13 place-items-center rounded-xl transition ${filtersOpen ? "bg-blue-50 text-blue-600" : "bg-blue-600 text-white"}`}>
            {filtersOpen ? <X /> : <SlidersHorizontal />}
          </button>
        </div>

        {filtersOpen && (
          <section className="absolute left-5 right-5 top-16 z-30 space-y-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between px-1"><h2 className="text-sm font-semibold text-slate-700">Filtros</h2><button onClick={clearFilters} className="text-xs font-medium text-slate-400 hover:text-blue-600">Limpar</button></div>
            <button onClick={filterByPrice} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${priceDescending ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}>
              <span><b className="font-medium">Maior preço primeiro</b><small className="ml-2 text-slate-400">ordem decrescente</small></span><ChevronDown size={17} />
            </button>
            <label className="block px-1 text-xs font-medium text-slate-500">Categoria
              <div className="mt-1.5 flex gap-2">
                <input value={categorySearch} onChange={(event) => setCategorySearch(event.target.value)} placeholder="Buscar categoria" className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-400" />
                <button type="button" onClick={findCategories} className="rounded-xl bg-blue-600 px-3.5 text-sm font-medium text-white">Buscar</button>
              </div>
              <select value={categoryId} onChange={(event) => void filterByCategory(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-400">
                <option value="">Todas as categorias</option>
                {categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.name}</option>)}
              </select>
            </label>
          </section>
        )}
      </div>

      <main className="grid grid-cols-2 gap-5 px-5">
        {loading && [1,2,3,4].map((item) => <div key={item} className="space-y-3"><div className="skeleton aspect-square rounded-2xl" /><div className="skeleton h-4 rounded" /><div className="skeleton h-3 w-2/3 rounded" /></div>)}
        {error && <p className="status-box status-error col-span-2">{error}</p>}
        {!loading && !error && !visible.length && <p className="status-box status-info col-span-2 text-center">Nenhum produto encontrado para esta seleção.</p>}
        {!loading && visible.map((product) => (
          <article key={product.id} className="group rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-[0_5px_18px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-lg">
            <Link href={`/produto/${product.id}`} className="block">
              <ProductPicture product={product} />
              <h2 className="mt-3 min-h-10 text-sm font-medium leading-snug text-slate-700">{product.nome}</h2>
              {product.precoPromocional && <del className="text-xs text-slate-400">{money(product.preco)}</del>}
              <p className="mt-0.5 text-lg font-bold text-slate-900">{money(salePrice(product))}</p>
              <p className="mt-1 text-xs font-semibold text-emerald-600">Estoque: {product.quantidadeEstoque}</p>
            </Link>
          </article>
        ))}
      </main>
      {!loading && !error && !priceDescending && !categoryId && totalPages > 1 && (
        <nav aria-label="Paginação do catálogo" className="mb-3 mt-7 flex items-center justify-center gap-4">
          <button aria-label="Página anterior" onClick={() => void loadPage(currentPage - 1)} disabled={currentPage === 0} className="grid size-9 place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-25"><ChevronLeft size={20} /></button>
          <span className="min-w-12 text-center text-sm font-medium text-slate-500"><b className="text-slate-800">{currentPage + 1}</b> / {totalPages}</span>
          <button aria-label="Próxima página" onClick={() => void loadPage(currentPage + 1)} disabled={currentPage + 1 >= totalPages} className="grid size-9 place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-25"><ChevronRight size={20} /></button>
        </nav>
      )}
      <MenuInferior />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuthenticated={() => { setAuthenticated(true); setUserName(getAuthProfile().nome); }} />
    </div>
  );
}
