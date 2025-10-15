"use client"
import { useParams } from "next/navigation"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function ProdutoDetalhe() {
  const { id } = useParams()
  const [openDescricao, setOpenDescricao] = useState(false)

  // Exemplo de produto (pode vir de um fetch depois)
  const produto = {
    nome: "Fritadeira Elétrica Sem Óleo",
    preco: "R$ 479,90",
    precoAntigo: "R$ 799,90",
    desconto: "40% OFF",
    avaliacao: "4.8 (1.245 avaliações)",
    descricaoCurta:
      "Cozinhe de forma mais saudável e prática. Tecnologia de circulação de ar quente para alimentos crocantes por fora e macios por dentro.",
    detalhes: `
      Transforme sua cozinha com a Fritadeira Elétrica Sem Óleo. 
      Com design moderno e tecnologia de ponta, ela permite preparar uma infinidade de pratos deliciosos e saudáveis.
      O cesto removível com revestimento antiaderente facilita a limpeza e o painel digital oferece controle preciso de tempo e temperatura.

      • Material: Plástico e Aço Inoxidável
      • Capacidade: 5 Litros
      • Potência: 1500W
      • Funções: Assar, fritar, tostar e gratinar
      • Extras: Timer sonoro e desligamento automático
      • Dimensões: 32cm x 28cm x 35cm (A x L x P)
    `,
    imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400"
  }

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen pb-24">
      {/* Imagem */}
      <img src={produto.imagem} alt={produto.nome} className="w-full rounded-b-3xl" />

      {/* Conteúdo */}
      <div className="px-4 mt-4">
        <h1 className="text-xl font-semibold text-gray-900">{produto.nome}</h1>
        <p className="text-sm text-gray-500 mt-1">⭐ {produto.avaliacao}</p>

        <div className="flex items-center gap-2 mt-2">
          <p className="text-2xl font-bold text-blue-600">{produto.preco}</p>
          <p className="line-through text-gray-400">{produto.precoAntigo}</p>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{produto.desconto}</span>
        </div>

        <p className="text-gray-600 text-sm mt-4">{produto.descricaoCurta}</p>

        {/* Seletores */}
        <div className="mt-5 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cor</label>
            <select className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-700">
              <option>Branco</option>
              <option>Preto</option>
              <option>Azul</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacidade</label>
            <select className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-700">
              <option>5 Litros</option>
              <option>7 Litros</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Voltagem</label>
            <select className="w-full border rounded-lg px-3 py-2 mt-1 text-gray-700">
              <option>110V</option>
              <option>220V</option>
            </select>
          </div>
        </div>

        {/* Descrição detalhada */}
        <button
          onClick={() => setOpenDescricao(!openDescricao)}
          className="flex justify-between items-center w-full mt-5 py-3 border-b"
        >
          <span className="text-sm font-medium text-gray-700">Descrição Detalhada</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${openDescricao ? "rotate-180" : ""}`} />
        </button>
        {openDescricao && (
          <p className="text-gray-600 text-sm whitespace-pre-line mt-3">{produto.detalhes}</p>
        )}
      </div>

      {/* Botão fixo */}
      <div className="fixed bottom-0 left-0 right-0 max-w-sm mx-auto bg-white border-t p-4">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  )
}
