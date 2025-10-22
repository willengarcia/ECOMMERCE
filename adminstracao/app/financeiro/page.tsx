"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Menu, MoreVertical, PlusCircle, CreditCard, DollarSign, TrendingUp, Wallet } from "lucide-react";
import NavBar from "../navbar/NavBar";

export default function Financeiro() {
  const data = [
    { name: "Jan", valor: 2000 },
    { name: "Fev", valor: 2800 },
    { name: "Mar", valor: 3500 },
    { name: "Abr", valor: 3100 },
    { name: "Mai", valor: 4200 },
    { name: "Jun", valor: 4800 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">Financeiro</h1>
      </header>

      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* Cards resumo */}
        <div className="grid grid-cols-2 gap-3">
          <ResumoCard titulo="Vendas Totais (mês)" valor="R$ 12.405,00" cor="text-gray-800" />
          <ResumoCard titulo="Pagamentos Pendentes" valor="R$ 1.200,00" cor="text-yellow-500" />
          <ResumoCard titulo="Vendas Canceladas" valor="R$ 850,00" cor="text-red-500" />
          <ResumoCard titulo="Lucro Líquido" valor="R$ 10.355,00" cor="text-green-600" />
        </div>

        {/* Evolução */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-gray-700">Evolução de Receita</h2>
            <span className="text-green-500 text-sm font-medium">+12%</span>
          </div>
          <p className="text-xs text-gray-400 mb-3">Últimos 30 dias</p>
          <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transações Recebidas */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">Transações Recebidas</h3>
          <Transacao id="#1254" nome="Alex Smith" valor="+R$ 150,00" status="Pago" />
          <Transacao id="#1253" nome="Emily Johnson" valor="+R$ 75,50" status="Pendente" />
          <Transacao id="#1252" nome="Michael Brown" valor="-R$ 50,00" status="Estornado" />
        </div>

        {/* Contas a pagar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">Contas a Pagar</h3>
            <span className="text-xs text-blue-500 font-medium">Novo</span>
          </div>
          <Conta nome="Frete" valor="-R$ 250,00" data="23 Out 2023" status="Vence em 5 dias" />
          <Conta nome="Fornecedor ABC" valor="-R$ 1.500,00" data="20 Out 2023" status="Pago" />
        </div>

        {/* Gateways */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">Gateways de Pagamento</h3>
          <Gateway nome="Stripe" status="Ativo" icone={<CreditCard className="w-5 h-5 text-blue-500" />} ativo />
          <Gateway nome="Mercado Pago" status="Inativo" icone={<Wallet className="w-5 h-5 text-gray-400" />} />
        </div>
      </main>

      {/* Botão flutuante */}
      <button className="fixed bottom-20 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition">
        <PlusCircle className="w-6 h-6" />
      </button>

      <NavBar />
    </div>
  );
}

/* COMPONENTES AUXILIARES */

function ResumoCard({
  titulo,
  valor,
  cor,
}: {
  titulo: string;
  valor: string;
  cor: string;
}) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col justify-center">
      <p className="text-xs text-gray-400">{titulo}</p>
      <p className={`text-lg font-semibold ${cor}`}>{valor}</p>
    </div>
  );
}

function Transacao({
  id,
  nome,
  valor,
  status,
}: {
  id: string;
  nome: string;
  valor: string;
  status: string;
}) {
  const corStatus =
    status === "Pago"
      ? "text-green-600"
      : status === "Pendente"
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="flex justify-between items-center py-2 border-b last:border-none">
      <div>
        <p className="font-semibold text-gray-800">Pedido {id}</p>
        <p className="text-xs text-gray-500">{nome}</p>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${corStatus}`}>{valor}</p>
        <p className="text-xs text-gray-400">{status}</p>
      </div>
    </div>
  );
}

function Conta({
  nome,
  valor,
  data,
  status,
}: {
  nome: string;
  valor: string;
  data: string;
  status: string;
}) {
  const corValor = valor.startsWith("-") ? "text-red-500" : "text-green-600";

  return (
    <div className="flex justify-between items-center py-2 border-b last:border-none">
      <div>
        <p className="font-semibold text-gray-800">{nome}</p>
        <p className="text-xs text-gray-500">{data}</p>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${corValor}`}>{valor}</p>
        <p className="text-xs text-gray-400">{status}</p>
      </div>
    </div>
  );
}

function Gateway({
  nome,
  status,
  icone,
  ativo,
}: {
  nome: string;
  status: string;
  icone: React.ReactNode;
  ativo?: boolean;
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-none">
      <div className="flex items-center gap-2">
        {icone}
        <div>
          <p className="font-semibold text-gray-800">{nome}</p>
          <p
            className={`text-xs ${
              ativo ? "text-green-500" : "text-gray-400"
            }`}
          >
            {status}
          </p>
        </div>
      </div>
      {ativo ? (
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
          Ativo
        </span>
      ) : (
        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-500 font-medium">
          Inativo
        </span>
      )}
    </div>
  );
}
