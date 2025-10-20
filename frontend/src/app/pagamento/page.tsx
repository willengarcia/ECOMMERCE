"use client";
import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";

export default function Pagamento({ onClose, subtotal }: any) {
  const [metodo, setMetodo] = useState("cartao");

  const total = subtotal ?? 1234.56;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 flex items-center bg-white shadow-sm">
        <button
          onClick={onClose}
          className="p-1 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-gray-800">
          Finalizar Compra
        </h1>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Resumo */}
        <section>
          <h2 className="text-sm font-medium text-gray-700 mb-2">
            Resumo do Pedido
          </h2>
          <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Subtotal</span>
              <span>
                R${" "}
                {subtotal?.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>
                R${" "}
                {total?.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </section>

        {/* Métodos de Pagamento */}
        <section>
          <h2 className="text-sm font-medium text-gray-700 mb-2">
            Escolha a forma de pagamento
          </h2>
          <div className="flex bg-gray-100 rounded-xl p-1 text-sm font-medium">
            {["boleto", "cartao", "pix"].map((m) => (
              <button
                key={m}
                onClick={() => setMetodo(m)}
                className={`flex-1 py-2 rounded-lg transition ${
                  metodo === m
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                {m === "boleto" && "Boleto"}
                {m === "cartao" && "Cartão de Crédito"}
                {m === "pix" && "Pix"}
              </button>
            ))}
          </div>
        </section>

        {/* Formulário - Cartão */}
        {metodo === "cartao" && (
          <section className="bg-white border rounded-xl p-4 space-y-3 shadow-sm">
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Seu Nome Completo"
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="MM/AA"
                className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-24 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>
        )}

        {/* Pix */}
        {metodo === "pix" && (
          <section className="bg-white border rounded-xl p-4 shadow-sm text-center text-gray-600 text-sm">
            Escaneie o QR Code gerado após clicar em “Finalizar Compra”.
          </section>
        )}

        {/* Boleto */}
        {metodo === "boleto" && (
          <section className="bg-white border rounded-xl p-4 shadow-sm text-center text-gray-600 text-sm">
            O boleto será gerado após clicar em “Finalizar Compra”.
          </section>
        )}
      </main>

      {/* Botão fixo no rodapé */}
      <footer className="p-4 bg-white border-t shadow-lg">
        <button className="w-full bg-blue-600 text-white py-3 rounded-full font-medium flex items-center justify-center space-x-2">
          <Lock className="w-4 h-4" />
          <span>Finalizar Compra</span>
        </button>
      </footer>
    </div>
  );
}
