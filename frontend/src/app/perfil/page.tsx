"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import MenuInferior from "../navegador/nav";

export default function Perfil() {
  const [tab, setTab] = useState<"login" | "cadastro">("login");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-center text-xl font-semibold text-gray-800 mb-6">
        Acesse sua conta
      </h1>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-xl overflow-hidden mb-6">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 py-2 font-medium text-sm transition ${
            tab === "login"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Entrar
        </button>
        <button
          onClick={() => setTab("cadastro")}
          className={`flex-1 py-2 font-medium text-sm transition ${
            tab === "cadastro"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500"
          }`}
        >
          Cadastrar
        </button>
      </div>

      {/* Formulário */}
      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full border rounded-lg px-3 py-2 text-sm mt-1 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Senha</label>
          <div className="relative mt-1">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              className="w-full border rounded-lg px-3 py-2 text-sm pr-10 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {tab === "login" && (
            <button className="text-xs text-blue-600 mt-1 hover:underline">
              Esqueci minha senha
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium shadow-lg hover:bg-blue-700 transition"
        >
          {tab === "login" ? "Entrar" : "Cadastrar"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="px-2 text-sm text-gray-500">Ou</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* Botões sociais */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center border rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_Plus_logo_%282015-2019%29.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Entrar com Google
        </button>
        <button className="w-full flex items-center justify-center border rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
            alt="Facebook"
            className="w-5 h-5 mr-2"
          />
          Entrar com Facebook
        </button>
      </div>

      {/* Termos */}
      <p className="text-xs text-center text-gray-500 mt-6">
        Ao continuar, você concorda com nossos{" "}
        <span className="text-blue-600 hover:underline cursor-pointer">
          Termos de Serviço
        </span>{" "}
        e{" "}
        <span className="text-blue-600 hover:underline cursor-pointer">
          Política de Privacidade
        </span>
        .
      </p>
      <MenuInferior></MenuInferior>
    </div>
  );
}
