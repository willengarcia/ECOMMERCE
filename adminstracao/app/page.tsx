"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PackagePlus, ListOrdered, Upload, Home, ShoppingBag, Settings, Box } from "lucide-react";
import NavBar from "./navbar/NavBar";

const data = [
  { name: "Seg", value: 400 },
  { name: "Ter", value: 300 },
  { name: "Qua", value: 500 },
  { name: "Qui", value: 450 },
  { name: "Sex", value: 320 },
  { name: "Sáb", value: 550 },
  { name: "Dom", value: 600 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Painel de Controle</h1>
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
      </header>

      {/* Main */}
      <main className="flex-1 p-4 overflow-y-auto">
        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card titulo="Vendas Totais" valor="R$ 1.250" sub="+5.2%" positivo />
          <Card titulo="Baixo Estoque" valor="5 itens" sub="Atenção" aviso />
          <Card titulo="Receita (30d)" valor="R$ 8.500" sub="-8.7%" negativo />
          <Card titulo="Pedidos Abertos" valor="12" sub="+2.1%" positivo />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 my-4">
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium">
            Semanal
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium">
            Mensal
          </button>
        </div>

        {/* Gráfico */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Desempenho de Vendas</h2>
          <p className="text-2xl font-bold text-gray-900">
            R$ 1.250 <span className="text-green-500 text-sm">+5.2%</span>
          </p>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Botões de ação */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <BotaoAcao icone={<PackagePlus />} rotulo="Adicionar Produto" />
          <BotaoAcao icone={<ListOrdered />} rotulo="Ver Pedidos" />
          <BotaoAcao icone={<Upload />} rotulo="Importar" />
        </div>

        {/* Pedidos recentes */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Pedidos Recentes</h3>
          <Pedido id="#1056" nome="John Doe" preco="R$ 459,99" status="Enviado" />
          <Pedido id="#1055" nome="Jane Smith" preco="R$ 82,50" status="Processando" />
          <Pedido id="#1054" nome="Peter Jones" preco="R$ 12,00" status="Enviado" />
          <Pedido id="#1053" nome="Mary Johnson" preco="R$ 150,25" status="Cancelado" />
        </div>
      </main>

      {/* Barra inferior */}
      <NavBar></NavBar>
    </div>
  );
}

/* COMPONENTES AUXILIARES */

function Card({
  titulo,
  valor,
  sub,
  positivo,
  negativo,
  aviso,
}: {
  titulo: string;
  valor: string;
  sub: string;
  positivo?: boolean;
  negativo?: boolean;
  aviso?: boolean;
}) {
  let corSub = "text-gray-400";
  if (positivo) corSub = "text-green-500";
  if (negativo) corSub = "text-red-500";
  if (aviso) corSub = "text-yellow-500";

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col">
      <p className="text-sm text-gray-400">{titulo}</p>
      <p className="text-xl font-semibold text-gray-800">{valor}</p>
      <span className={`text-sm font-medium ${corSub}`}>{sub}</span>
    </div>
  );
}

function BotaoAcao({ icone, rotulo }: { icone: React.ReactNode; rotulo: string }) {
  return (
    <button className="flex flex-col items-center justify-center bg-blue-50 text-blue-600 rounded-2xl py-3 hover:bg-blue-100 transition">
      {icone}
      <span className="text-sm mt-1 font-medium">{rotulo}</span>
    </button>
  );
}

function Pedido({ id, nome, preco, status }: { id: string; nome: string; preco: string; status: string }) {
  const cores: Record<string, string> = {
    Enviado: "bg-green-100 text-green-700",
    Processando: "bg-yellow-100 text-yellow-700",
    Cancelado: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex justify-between items-center py-2 border-b last:border-none">
      <div>
        <p className="font-semibold text-gray-800">Pedido {id}</p>
        <p className="text-sm text-gray-500">{nome} - {preco}</p>
      </div>
      <span className={`px-3 py-1 text-xs rounded-full font-medium ${cores[status] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    </div>
  );
}

function NavItem({ icone, rotulo, ativo }: { icone: React.ReactNode; rotulo: string; ativo?: boolean }) {
  return (
    <button
      className={`flex flex-col items-center text-sm font-medium ${
        ativo ? "text-blue-600" : "text-gray-400"
      }`}
    >
      {icone}
      <span className="text-xs mt-1">{rotulo}</span>
    </button>
  );
}
