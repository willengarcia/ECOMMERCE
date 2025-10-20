"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import MenuInferior from "@/app/navegador/nav";
import Pagamento from "@/app/pagamento/page";

export default function Carrinho() {
  const [abrirPagamento, setAbrirPagamento] = useState(false);

  const [itens, setItens] = useState([
    {
      id: 1,
      nome: "Camiseta Básica",
      preco: 49.9,
      imagem:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
      quantidade: 1,
    },
    {
      id: 2,
      nome: "Calça Jeans Skinny",
      preco: 99.9,
      imagem:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
      quantidade: 1,
    },
  ]);

  const subtotal = itens.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <div className="relative min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-gray-700">Meu Carrinho</h1>
      </header>

      {/* Itens */}
      <div className="p-4 space-y-3">
        {itens.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded-2xl shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {item.nome}
                </p>
                <p className="text-gray-500 text-sm">
                  R$ {item.preco.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                setItens((prev) => prev.filter((i) => i.id !== item.id))
              }
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-white mx-4 p-4 rounded-2xl shadow-sm mt-4 space-y-2">
        <div className="flex justify-between text-gray-700 text-sm">
          <span>Subtotal</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-semibold text-gray-800">
          <span>Total</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Botão Final */}
      <div className="mx-4 mt-6">
        <button
          onClick={() => setAbrirPagamento(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium shadow-lg"
        >
          Prosseguir para Compra
        </button>
      </div>

      <MenuInferior />

      {/* Pagamento full screen */}
      {abrirPagamento && (
        <div className="fixed inset-0 z-50 bg-white animate-fadeIn flex flex-col">
          {/* Componente de Pagamento preenchendo 100% */}
          <Pagamento onClose={() => setAbrirPagamento(false)} subtotal={subtotal} />
        </div>
      )}
    </div>
  );
}
