"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, FlaskConical, LogIn, LogOut, Mail, ShieldCheck, UserRound } from "lucide-react";
import MenuInferior from "../navegador/nav";
import AuthModal from "../components/auth-modal";
import { login as loginRequest } from "@/lib/api";
import { clearAuthSession, getAuthProfile, isAuthenticated, saveAuthSession } from "@/lib/session";

export default function Perfil() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [nextPath, setNextPath] = useState("/");
  const [profile, setProfile] = useState<ReturnType<typeof getAuthProfile> | null>(null);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNextPath(params.get("next") || "/");
    const loggedIn = isAuthenticated();
    setAuthenticated(loggedIn);
    if (loggedIn) setProfile(getAuthProfile());
    if (params.get("loginRequired")) setMessage("Entre na sua conta para adicionar produtos ao carrinho.");
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setMessage("");
    try {
      const session = await loginRequest(email, senha);
      saveAuthSession(session);
      setProfile({ id: session.id, nome: session.nome, email: session.email, status: session.status });
      setAuthenticated(true);
      router.push(nextPath);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível realizar o login.");
    } finally { setLoading(false); }
  }

  function logout() { clearAuthSession(); setAuthenticated(false); setProfile(null); setMessage("Sessão encerrada com segurança."); }

  return <div className="app-shell px-5 pt-10">
    <header className="mb-5 text-center"><div className="mb-3 flex items-center justify-center gap-2"><strong className="text-lg">TechSkill</strong><span className="env-badge">HOMOLOGAÇÃO</span></div><span className="mx-auto mb-3 grid size-14 place-items-center rounded-full bg-blue-100 text-blue-600"><UserRound size={28} /></span><h1 className="text-2xl font-black">{authenticated ? "Minha conta" : "Acesse sua conta"}</h1><p className="mt-1 text-sm text-slate-500">Sessão segura para o ambiente de testes</p></header>
    <div className="homolog-banner mb-4 flex gap-2"><FlaskConical size={17} className="shrink-0 text-blue-600" /><span>Credenciais e operações utilizadas exclusivamente para homologação.</span></div>
    {message && <p role="status" className={`mb-4 rounded-xl p-3 text-sm ${message.includes("Entre") ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-700"}`}>{message}</p>}
    {authenticated ? <div className="space-y-4"><section className="card p-5"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-blue-50 font-black text-blue-700">{profile?.nome.charAt(0).toUpperCase()}</span><div><h2 className="font-bold">{profile?.nome}</h2><p className="text-xs text-slate-500">Usuário de teste #{profile?.id}</p></div></div><div className="mt-5 space-y-3 border-t pt-4 text-sm"><p className="flex items-center gap-2 text-slate-600"><Mail size={17} />{profile?.email}</p><p className="flex items-center gap-2 text-slate-600"><ShieldCheck size={17} /><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">{profile?.status}</span></p></div></section><button onClick={logout} className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700"><LogOut size={19} />Sair da conta</button></div> : <form onSubmit={submit} className="card space-y-4 p-5">
      <label className="block text-sm font-medium">E-mail<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" className="field mt-1.5" /></label>
      <label className="block text-sm font-medium">Senha<div className="relative mt-1.5"><input required type={showPassword ? "text" : "password"} value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="Digite sua senha" className="field pr-12" /><button type="button" onClick={() => setShowPassword((show) => !show)} aria-label="Mostrar senha" className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-400">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label>
      <button disabled={loading} className="primary-button"><LogIn size={19} />{loading ? "Entrando..." : "Entrar"}</button><div className="flex items-center gap-3 py-1 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />ou<span className="h-px flex-1 bg-slate-200" /></div><button type="button" onClick={() => setRegisterOpen(true)} className="w-full rounded-xl border border-blue-200 py-3 font-bold text-blue-700 hover:bg-blue-50">Criar uma conta</button>
    </form>}
    <AuthModal open={registerOpen} initialMode="register" onClose={() => setRegisterOpen(false)} onAuthenticated={() => { setAuthenticated(true); setProfile(getAuthProfile()); }} />
    <MenuInferior />
  </div>;
}
