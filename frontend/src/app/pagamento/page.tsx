"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, FlaskConical, Lock, ShieldCheck } from "lucide-react";
import { money } from "@/lib/catalog";
import { createPayment } from "@/lib/api";

function Checkout() {
  const router = useRouter(); const params = useSearchParams();
  const total = Number(params.get("total")); const orderId = Number(params.get("orderId"));
  const orderStatus = params.get("orderStatus") || "AGUARDANDO_PAGAMENTO"; const created = params.get("created") === "1";
  const [method, setMethod] = useState("CARTAO"); const [status, setStatus] = useState(""); const [processing, setProcessing] = useState(false);
  async function finish() { if (!orderId) return setStatus("Pedido não informado pelo backend."); setProcessing(true); setStatus(""); try { const result = await createPayment(orderId, method); setStatus(`Solicitação registrada no ambiente de homologação. Status: ${result.status.replaceAll("_", " ")}.`); } catch (error) { setStatus(error instanceof Error ? error.message : "Não foi possível registrar a solicitação de pagamento."); } finally { setProcessing(false); } }
  return <div className="app-shell pb-8">
    <header className="relative flex items-center border-b border-slate-200/70 bg-white px-5 py-5"><button onClick={() => router.back()} aria-label="Voltar"><ArrowLeft size={26} /></button><h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-black">Checkout</h1><span className="env-badge ml-auto">HOMOLOGAÇÃO</span></header>
    <div className="mx-5 my-4 flex items-center justify-between text-[10px] font-semibold text-slate-400"><span>PRODUTOS</span><span>→</span><span>ENDEREÇO</span><span>→</span><span>CHECKOUT</span><span>→</span><span className="text-blue-600">PAGAMENTO</span></div>
    <main className="space-y-5 px-5">
      {created && <div className="status-box status-success flex items-start gap-3"><CheckCircle2 className="mt-0.5 shrink-0" size={19} /><div><strong>Pedido criado com sucesso no ambiente de homologação.</strong><p className="mt-1 text-xs opacity-80">Pedido #{orderId}</p></div></div>}
      <section><h2 className="mb-3 text-lg font-black">Resumo do pedido</h2><div className="card p-5"><div className="flex justify-between py-1 text-sm text-slate-500"><span>Produtos</span><span>{money(total)}</span></div><div className="flex justify-between py-1 text-sm text-slate-500"><span>Entrega</span><span>{money(0)}</span></div><div className="mt-3 flex justify-between border-t pt-4 text-xl font-black"><span>Total</span><span className="text-blue-700">{money(total)}</span></div><div className="mt-4"><span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Status</span><p className="mt-1 inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700">{orderStatus.replaceAll("_", " ")}</p></div></div></section>
      <div className="homolog-banner flex items-start gap-3"><FlaskConical className="mt-0.5 shrink-0 text-blue-600" size={20} /><div><strong>Pagamento em ambiente de homologação</strong><p className="mt-1 text-sm">Nenhuma cobrança real será realizada.</p><p className="mt-1 text-xs text-slate-500">A integração do gateway está em desenvolvimento e validação.</p></div></div>
      <section><h2 className="mb-3 text-lg font-black">Forma de pagamento para teste</h2><div className="grid grid-cols-3 rounded-xl bg-slate-100 p-1">{[["BOLETO","Boleto"],["CARTAO","Cartão"],["PIX","Pix"]].map(([value,label]) => <button key={value} onClick={() => setMethod(value)} className={`rounded-lg py-2.5 text-sm transition ${method === value ? "bg-white font-bold text-blue-600 shadow-sm" : "text-slate-500"}`}>{label}</button>)}</div></section>
      {method === "CARTAO" ? <section className="card space-y-4 p-5"><p className="flex items-center gap-2 text-xs text-slate-500"><ShieldCheck size={16} />Utilize apenas dados de teste.</p><label className="block text-sm font-medium">Número do cartão<input className="field mt-2" placeholder="0000 0000 0000 0000" inputMode="numeric" /></label><label className="block text-sm font-medium">Nome no cartão<input className="field mt-2" placeholder="Nome para teste" /></label><div className="grid grid-cols-2 gap-4"><label className="text-sm font-medium">Validade<input className="field mt-2" placeholder="MM/AA" /></label><label className="text-sm font-medium">CVV<input className="field mt-2" placeholder="000" inputMode="numeric" /></label></div></section> : <section className="card p-5 text-center text-sm text-slate-600">A geração de {method === "PIX" ? "QR Code" : "boleto"} está em desenvolvimento para este ambiente.</section>}
      <button onClick={finish} disabled={processing} className="primary-button"><Lock size={19} />{processing ? "Registrando..." : "Continuar para pagamento"}</button>
      {status && <p role="status" className={`status-box ${status.includes("registrada") ? "status-success" : "status-error"}`}>{status}</p>}
    </main>
  </div>;
}
export default function Pagamento() { return <Suspense><Checkout /></Suspense>; }
