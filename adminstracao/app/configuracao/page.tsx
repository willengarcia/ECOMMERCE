"use client";

import { ArrowLeft, Lock, CreditCard, Settings, Wallet2 } from "lucide-react";
import NavBar from "../navbar/NavBar";
import Image from "next/image";
import Link from "next/link";

export default function Configuracoes() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <ArrowLeft className="w-5 h-5 text-gray-600" />
        <h1 className="text-lg font-semibold text-gray-800">Ajustes</h1>
      </header>

      {/* Perfil */}
      <main className="flex-1 p-4">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Avatar"
            className="w-[70px] h-[70px] rounded-full mb-3"
          />
          <h2 className="text-base font-semibold text-gray-800">
            Alexandre Silva
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            alexandre.silva@example.com
          </p>

          <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            <Lock className="w-4 h-4" />
            Alterar senha
          </button>
        </div>

        {/* Opções de Configuração */}
        <div className="bg-white rounded-2xl shadow-sm divide-y">
          <ItemConfiguracao
            icone={<Wallet2 className="w-5 h-5 text-blue-500" />}
            titulo="Financeiro"
            href="/financeiro"
          />
          <ItemConfiguracao
            icone={<Settings className="w-5 h-5 text-blue-500" />}
            titulo="Integrações"
            href="/integracoes"
          />
          <ItemConfiguracao
            icone={<CreditCard className="w-5 h-5 text-blue-500" />}
            titulo="Pagamentos da plataforma"
            href="/pagamentos"
          />
        </div>
      </main>

      <NavBar />
    </div>
  );
}

/* COMPONENTE AUXILIAR */
function ItemConfiguracao({
  icone,
  titulo,
  href,
}: {
  icone: React.ReactNode;
  titulo: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
    >
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 p-2 rounded-lg">{icone}</div>
        <span className="text-sm font-medium text-gray-800">{titulo}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
