"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Eye, EyeOff, LogIn, MapPin, UserPlus, X } from "lucide-react";
import { login, registerAddress, registerCustomer } from "@/lib/api";
import { saveAuthSession } from "@/lib/session";

type Props = { open: boolean; onClose: () => void; onAuthenticated: () => void; initialMode?: "login" | "register" };

export default function AuthModal({ open, onClose, onAuthenticated, initialMode = "login" }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ nomeCompleto: "", cpf: "", email: "", telefone: "", senha: "" });
  const [registrationStep, setRegistrationStep] = useState<"account" | "address">("account");
  const [newCustomerId, setNewCustomerId] = useState<number | null>(null);
  const [address, setAddress] = useState({ nomeEndereco: "Casa", nomeDestinatario: "", cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "" });
  useEffect(() => { if (open) { setMode(initialMode); setMessage(""); setRegistrationStep("account"); setNewCustomerId(null); } }, [initialMode, open]);
  if (!open) return null;
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const updateAddress = (field: keyof typeof address, value: string) => setAddress((current) => ({ ...current, [field]: value }));
  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setMessage("");
    try {
      if (mode === "register" && registrationStep === "account") {
        await registerCustomer(form);
        const session = await login(form.email, form.senha);
        saveAuthSession(session);
        setNewCustomerId(session.id);
        setAddress((current) => ({ ...current, nomeDestinatario: form.nomeCompleto }));
        setRegistrationStep("address");
        setMessage("Conta criada. Agora cadastre o endereço de entrega.");
      } else if (mode === "register") {
        if (!newCustomerId) throw new Error("Não foi possível identificar o novo cliente.");
        await registerAddress({ customerId: newCustomerId, ...address });
        setMessage("Conta e endereço cadastrados com sucesso.");
        onAuthenticated(); onClose();
      } else {
        const session = await login(form.email, form.senha);
        saveAuthSession(session); onAuthenticated(); onClose();
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : "Não foi possível concluir a solicitação."); }
    finally { setLoading(false); }
  }
  return <div className="fixed inset-0 z-[80] grid place-items-end bg-slate-950/40 p-0 backdrop-blur-sm sm:place-items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-label={mode === "login" ? "Entrar" : "Criar conta"} className="max-h-[94dvh] w-full max-w-md overflow-y-auto rounded-t-[28px] bg-white p-6 shadow-2xl sm:rounded-[28px]">
      <div className="mb-5 flex items-start justify-between"><div><div className="flex items-center gap-2"><h2 className="text-2xl font-black">{mode === "login" ? "Olá!" : registrationStep === "account" ? "Crie sua conta" : "Endereço de entrega"}</h2><span className="env-badge">HML</span></div><p className="mt-1 text-sm text-slate-500">{mode === "login" ? "Entre para comprar e acompanhar pedidos." : registrationStep === "account" ? "Etapa 1 de 2 • Dados pessoais" : "Etapa 2 de 2 • Complete o cadastro"}</p></div><button onClick={onClose} aria-label="Fechar" className="grid size-9 place-items-center rounded-full bg-slate-100 text-slate-500"><X size={19} /></button></div>
      {registrationStep === "account" && <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1"><button type="button" onClick={() => { setMode("login"); setMessage(""); }} className={`rounded-lg py-2.5 text-sm font-bold ${mode === "login" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500"}`}>Entrar</button><button type="button" onClick={() => { setMode("register"); setMessage(""); }} className={`rounded-lg py-2.5 text-sm font-bold ${mode === "register" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500"}`}>Criar conta</button></div>}
      {message && <p className={`status-box mb-4 ${message.includes("sucesso") ? "status-success" : "status-error"}`}>{message}</p>}
      <form onSubmit={submit} className="space-y-3">
        {mode === "register" && registrationStep === "address" ? <><div className="grid grid-cols-2 gap-3"><label className="block text-sm font-semibold">Identificação<input required value={address.nomeEndereco} onChange={(e) => updateAddress("nomeEndereco", e.target.value)} placeholder="Casa" className="field mt-1.5" /></label><label className="block text-sm font-semibold">CEP<input required value={address.cep} onChange={(e) => updateAddress("cep", e.target.value)} className="field mt-1.5" inputMode="numeric" /></label></div><label className="block text-sm font-semibold">Destinatário<input required value={address.nomeDestinatario} onChange={(e) => updateAddress("nomeDestinatario", e.target.value)} className="field mt-1.5" /></label><label className="block text-sm font-semibold">Rua<input required value={address.rua} onChange={(e) => updateAddress("rua", e.target.value)} className="field mt-1.5" /></label><div className="grid grid-cols-2 gap-3"><label className="block text-sm font-semibold">Número<input required value={address.numero} onChange={(e) => updateAddress("numero", e.target.value)} className="field mt-1.5" /></label><label className="block text-sm font-semibold">Complemento<input value={address.complemento} onChange={(e) => updateAddress("complemento", e.target.value)} className="field mt-1.5" /></label></div><label className="block text-sm font-semibold">Bairro<input required value={address.bairro} onChange={(e) => updateAddress("bairro", e.target.value)} className="field mt-1.5" /></label><div className="grid grid-cols-[1fr_90px] gap-3"><label className="block text-sm font-semibold">Cidade<input required value={address.cidade} onChange={(e) => updateAddress("cidade", e.target.value)} className="field mt-1.5" /></label><label className="block text-sm font-semibold">UF<input required maxLength={2} value={address.estado} onChange={(e) => updateAddress("estado", e.target.value.toUpperCase())} className="field mt-1.5 uppercase" /></label></div></> : <><>{mode === "register" && <><label className="block text-sm font-semibold">Nome completo<input required value={form.nomeCompleto} onChange={(e) => update("nomeCompleto", e.target.value)} className="field mt-1.5" autoComplete="name" /></label><div className="grid grid-cols-2 gap-3"><label className="block text-sm font-semibold">CPF<input required value={form.cpf} onChange={(e) => update("cpf", e.target.value)} className="field mt-1.5" inputMode="numeric" /></label><label className="block text-sm font-semibold">Telefone<input required value={form.telefone} onChange={(e) => update("telefone", e.target.value)} className="field mt-1.5" inputMode="tel" /></label></div></>}</><label className="block text-sm font-semibold">E-mail<input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="field mt-1.5" autoComplete="email" /></label><label className="block text-sm font-semibold">Senha<div className="relative mt-1.5"><input required minLength={6} type={showPassword ? "text" : "password"} value={form.senha} onChange={(e) => update("senha", e.target.value)} className="field pr-12" autoComplete={mode === "login" ? "current-password" : "new-password"} /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-400" aria-label="Mostrar senha">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label></>}
        <button disabled={loading} className="primary-button">{mode === "login" ? <LogIn size={19} /> : registrationStep === "address" ? <MapPin size={19} /> : <UserPlus size={19} />}{loading ? "Aguarde..." : mode === "login" ? "Entrar" : registrationStep === "address" ? "Salvar endereço e concluir" : "Continuar para endereço"}</button>
      </form>
      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400"><CheckCircle2 size={14} />Autenticação JWT pelo backend TechSkill</p>
    </section>
  </div>;
}
