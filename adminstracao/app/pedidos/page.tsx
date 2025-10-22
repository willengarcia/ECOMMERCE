"use client";

import { useState } from "react";
import { Menu, Search, Download, MoreVertical } from "lucide-react";
import NavBar from "../navbar/NavBar";

export default function Pedidos() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");

  const pedidos = [
    {
      id: "#12345",
      cliente: "John Doe",
      data: "11/12/2023",
      valor: "R$ 125,50",
      status: "Novo",
    },
    {
      id: "#12346",
      cliente: "Jane Smith",
      data: "11/11/2023",
      valor: "R$ 89,90",
      status: "Pago",
    },
    {
      id: "#12347",
      cliente: "Sam Wilson",
      data: "11/10/2023",
      valor: "R$ 94,00",
      status: "Enviado",
    },
    {
      id: "#12348",
      cliente: "Emily Carter",
      data: "11/09/2023",
      valor: "R$ 45,75",
      status: "Concluído",
    },
  ];

  const pedidosFiltrados =
    filtroAtivo === "Todos"
      ? pedidos
      : pedidos.filter((p) => p.status === filtroAtivo);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white px-5 py-4 shadow-sm flex justify-between items-center">
        <button>
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Pedidos</h1>
        <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 text-sm font-medium">
          <Download className="w-4 h-4" />
          Exportar
        </button>
      </header>

      {/* Campo de busca */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por número, cliente ou produto..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-3">
        {["Todos", "Hoje", "Últimos 7 dias", "Últimos 30 dias"].map((f) => (
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

      {/* Lista de pedidos */}
      <main className="flex-1 p-4 space-y-3">
        {pedidosFiltrados.length > 0 ? (
          pedidosFiltrados.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-sm p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  Pedido {p.id}
                </p>
                <p className="text-sm text-gray-500">
                  {p.cliente} - {p.data} - {p.valor}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    p.status === "Novo"
                      ? "bg-yellow-100 text-yellow-700"
                      : p.status === "Pago"
                      ? "bg-green-100 text-green-700"
                      : p.status === "Enviado"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {p.status}
                </span>
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500 flex flex-col items-center justify-center mt-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 mb-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6a7.5 7.5 0 015.737 12.5l3.263 3.263a.75.75 0 11-1.06 1.06L15.177 19.56A7.5 7.5 0 1110.5 6z"
              />
            </svg>
            <p className="font-medium">Nenhum pedido encontrado</p>
            <p className="text-sm text-gray-400">
              Tente ajustar seus filtros para encontrar o que procura.
            </p>
          </div>
        )}
      </main>

      <NavBar />
    </div>
  );
}
