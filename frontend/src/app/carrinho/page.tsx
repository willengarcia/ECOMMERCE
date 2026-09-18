"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, FlaskConical, ImageOff, MapPin, PackageCheck, Trash2 } from "lucide-react";
import MenuInferior from "../navegador/nav";
import { createOrder, getCart, removeCartItem } from "@/lib/api";
import { CartDetails, money, productImage } from "@/lib/catalog";
import { clearCartId, getCartId, getCustomerId, getLastCartId } from "@/lib/session";

export default function Carrinho() {
  const router = useRouter();
  const [cart, setCart] = useState<CartDetails | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cartId, setCurrentCartId] = useState<number | null>(null);

  async function load() {
    const id = getCartId() ?? getLastCartId(); setCurrentCartId(id);
    if (!id) { setLoading(false); return; }
    try { setCart(await getCart(id, getCustomerId())); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível carregar o carrinho."); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  async function remove(itemId: number) {
    if (!cartId) return;
    try { await removeCartItem(cartId, itemId); await load(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível remover o item."); }
  }

  async function checkout() {
    if (!cart?.address || !cartId) { setError("Selecione um carrinho e endereço válidos para continuar."); return; }
    setSubmitting(true); setError("");
    try {
      const order = await createOrder(getCustomerId(), cartId, cart.address.id);
      clearCartId();
      router.push(`/pagamento?total=${order.valorTotal}&orderId=${order.orderId}&created=1&orderStatus=${encodeURIComponent(order.status)}`);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Não foi possível criar o pedido."); setSubmitting(false); }
  }

  return <div className="app-shell">
    <header className="relative flex items-center border-b border-slate-200/70 bg-white px-5 py-5"><button onClick={() => router.back()} aria-label="Voltar"><ArrowLeft /></button><h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-black">Meu Carrinho</h1><span className="env-badge ml-auto">HOMOLOGAÇÃO</span></header>
    <div className="mx-5 my-4 flex items-center justify-between text-[10px] font-semibold text-slate-400"><span className="text-blue-600">PRODUTOS</span><span>→</span><span>ENDEREÇO</span><span>→</span><span>CHECKOUT</span><span>→</span><span>PAGAMENTO</span></div>
    <main className="space-y-4 px-5">
      {loading && <><div className="skeleton h-32 rounded-2xl" /><div className="skeleton h-32 rounded-2xl" /></>}
      {error && <p className="status-box status-error">{error}</p>}
      {!loading && !error && !cart && <section className="card p-8 text-center"><PackageCheck className="mx-auto mb-3 text-blue-500" size={34} /><h2 className="font-bold">Seu carrinho está vazio</h2><p className="mt-1 text-sm text-slate-500">Adicione um produto do catálogo para iniciar o fluxo de homologação.</p><button onClick={() => router.push("/")} className="mt-5 text-sm font-semibold text-blue-600">Voltar ao catálogo</button></section>}
      {cart?.cartItems.map((item) => { const image = productImage(item.products as never); return <article key={item.cartItemId} className="card flex gap-4 p-4">{image ? <img src={image} alt={item.products.nome} className="size-24 rounded-xl object-cover" /> : <div className="grid size-24 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-400"><ImageOff /></div>}<div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h2 className="font-semibold text-slate-800">{item.products.nome}</h2><button onClick={() => remove(item.cartItemId)} aria-label="Remover item" className="self-start text-slate-400 hover:text-red-500"><Trash2 size={19} /></button></div><p className="mt-2 text-sm text-slate-500">{money(item.precoUnitario)} × {item.quantidade}</p><strong className="mt-1 block text-blue-700">{money(item.subtotal)}</strong></div></article>; })}
      {cart && <>
        <section className="card p-5"><div className="flex justify-between text-sm text-slate-500"><span>Produtos</span><span>{money(cart.cart.valorTotal)}</span></div><div className="mt-3 flex justify-between border-t pt-3 text-xl font-black"><span>Total</span><span>{money(cart.cart.valorTotal)}</span></div><div className="mt-4 flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-600" /><span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{cart.cart.status.replaceAll("_", " ")}</span></div></section>
        {cart.address && <section className="card flex gap-3 p-4"><MapPin className="shrink-0 text-blue-600" /><div><h2 className="font-bold">Endereço selecionado</h2><p className="mt-1 text-sm text-slate-600">{cart.address.rua}, {cart.address.numero} — {cart.address.cidade}/{cart.address.estado}</p><p className="text-xs text-slate-400">CEP {cart.address.cep}</p></div></section>}
        <div className="homolog-banner flex gap-2"><FlaskConical size={17} className="shrink-0 text-blue-600" /><span>Pedido e pagamento serão processados no ambiente de homologação.</span></div>
        <button onClick={checkout} disabled={submitting} className="primary-button">{submitting ? "Criando pedido..." : "Continuar para checkout"}</button>
      </>}
    </main><MenuInferior />
  </div>;
}
