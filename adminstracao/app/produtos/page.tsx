"use client";

import { useState } from "react";
import { Plus, Search, Menu } from "lucide-react";
import NavBar from "../navbar/NavBar";

export default function Produtos() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");

  const produtos = [
    {
      nome: "Carteira de Couro Clássica",
      preco: "R$ 59,99",
      estoque: 50,
      imagem: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=500",
    },
    {
      nome: "Caixa de Som Bluetooth",
      preco: "R$ 89,99",
      estoque: 25,
      imagem: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=500",
    },
    {
      nome: "Camiseta de Algodão Orgânico",
      preco: "R$ 24,99",
      estoque: 0,
      imagem: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=500",
    },
    {
      nome: "Óculos de Sol Designer",
      preco: "R$ 149,99",
      estoque: 112,
      imagem: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=500",
    },
    {
      nome: "Garrafa Térmica Inox",
      preco: "R$ 35,00",
      estoque: 250,
      imagem: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=500",
    },
  ];

  const produtosFiltrados = produtos.filter((p) => {
    if (filtroAtivo === "Todos") return true;
    if (filtroAtivo === "Em estoque") return p.estoque > 0;
    if (filtroAtivo === "Sem estoque") return p.estoque === 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white px-5 py-4 shadow-sm flex justify-between items-center">

        <h1 className="text-lg font-semibold text-gray-800">Produtos</h1>
        <button>
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 bg-white shadow-sm">
        {["Todos", "Em estoque", "Sem estoque", "Por categoria"].map((f) => (
          <button
            key={f}
            onClick={() => setFiltroAtivo(f)}
            className={`px-3 py-1 text-sm rounded-lg border ${
              filtroAtivo === f
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista de produtos */}
      <main className="flex-1 p-4 space-y-3">
        {produtosFiltrados.map((p) => (
          <div
            key={p.nome}
            className="bg-white flex items-center justify-between p-3 rounded-2xl shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={p.imagem}
                alt={p.nome}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{p.nome}</p>
                <p
                  className={`text-xs ${
                    p.estoque > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {p.estoque > 0
                    ? `Em estoque: ${p.estoque}`
                    : "Sem estoque"}
                </p>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-700">{p.preco}</span>
          </div>
        ))}
      </main>

      {/* Paginação */}
      <div className="flex items-center justify-center gap-2 py-4">
        <button className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300">
          {"<"}
        </button>
        {[1, 2, 3, "...", 12].map((n, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded-full text-sm font-medium ${
              n === 1
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {n}
          </button>
        ))}
        <button className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300">
          {">"}
        </button>
      </div>

      {/* Botão flutuante */}
      <button className="fixed bottom-20 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition">
        <Plus className="w-5 h-5" />
      </button>

      <NavBar />
    </div>
  );
}
