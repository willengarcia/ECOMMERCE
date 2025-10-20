"use client";
import Image from "next/image";
import { useState } from "react"
import Link from "next/link";
import { Filter } from "lucide-react";
import MenuInferior from "@/app/navegador/nav";
import { Heart, Home, ShoppingCart, Search, User } from "lucide-react"

export default function CasaLar() {
  const [favorites, setFavorites] = useState<number[]>([])

  const produtos = [
    { id: 1, nome: "Jogo de Cama de Algodão", preco: "R$ 249,90", imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { id: 2, nome: "Aparelho de Jantar de Porcelana", preco: "R$ 499,90", imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { id: 3, nome: "Jogo de Toalhas de Algodão Egípcio", preco: "R$ 199,90", imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { id: 4, nome: "Liquidificador de Alta Potência", preco: "R$ 399,90", imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { id: 5, nome: "Edredom de Plumas de Ganso", preco: "R$ 799,90", imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { id: 6, nome: "Faqueiro de Aço Inox com Cepo", preco: "R$ 299,90", imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { id: 7, nome: "Tapete de Banheiro Aconchegante", preco: "R$ 79,90", imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
    { id: 8, nome: "Fritadeira Elétrica sem Óleo", preco: "R$ 499,90", imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400" },
  ]

  const toggleFavorite = (id: number) => {
    setFavorites(favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id])
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="Rodrigues Colchões"
          width={120}   // ajuste conforme o tamanho desejado
          height={40}
          className="object-contain"
        />
      </div>

      {/* Ícone do carrinho */}
      <Filter className="w-5 h-5 text-gray-700" />
    </header>

      {/* Barra de busca */}
      <div className="p-4">
        <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
          <Search className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por cama, mesa, banho..."
            className="flex-1 bg-transparent outline-none px-2 text-sm"
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lista de produtos */}
      <main className="grid grid-cols-2 gap-3 px-3 pb-20">
        {produtos.map(produto => (
          <Link
            href={`/produto/${produto.id}`}
            key={produto.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm relative hover:shadow-md transition"
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-36 object-cover"
            />
            <button
              onClick={() => toggleFavorite(produto.id)}
              className={`absolute top-2 right-2 p-1 rounded-full bg-white shadow ${
                favorites.includes(produto.id)
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            >
              <Heart className="w-4 h-4" fill={favorites.includes(produto.id) ? "#2563EB" : "none"} />
            </button>
            <div className="p-2">
              <p className="text-sm font-medium leading-tight text-gray-500">{produto.nome}</p>
              <p className="text-gray-500 text-sm">{produto.preco}</p>
            </div>
          </Link>
        ))}
      </main>

      {/* Menu inferior */}
      <MenuInferior></MenuInferior>
    </div>
  )
}
