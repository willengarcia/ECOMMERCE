"use client";
import { useState } from "react";
import Link from "next/link";
import { Grid, List, ShoppingCart, Heart } from "lucide-react";
import MenuInferior from "@/app/navegador/nav";

export default function Favoritos() {
  const [view, setView] = useState("grade");
  const [favorites, setFavorites] = useState<number[]>([1, 2, 3, 4]); // simulando favoritos

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const favoritos = [
    {
      id: 1,
      nome: "Smartwatch Moderno",
      preco: "R$ 799,90",
      imagem:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
    },
    {
      id: 2,
      nome: "Fone de Ouvido Pro",
      preco: "R$ 1.200,00",
      imagem:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
    },
    {
      id: 3,
      nome: "Câmera Vintage",
      preco: "R$ 2.500,00",
      imagem:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
    },
    {
      id: 4,
      nome: "Tênis Esportivo",
      preco: "R$ 450,00",
      imagem:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-700">Meus Favoritos</h1>
        <div className="flex items-center space-x-2">
          <button
            className={`p-2 rounded-lg ${
              view === "grade"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => setView("grade")}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-lg ${
              view === "lista"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => setView("lista")}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Lista de Favoritos */}
      <div
        className={`grid ${
          view === "grade" ? "grid-cols-2 gap-4" : "grid-cols-1 gap-3"
        }`}
      >
        {favoritos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm relative hover:shadow-md transition"
          >
            <Link href={`/produto/${produto.id}`}>
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-36 object-cover"
              />
            </Link>

            {/* Botão de favorito */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(produto.id);
              }}
              className={`absolute top-2 right-2 p-1 rounded-full bg-white shadow ${
                favorites.includes(produto.id)
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}
            >
              <Heart
                className="w-4 h-4"
                fill={favorites.includes(produto.id) ? "#2563EB" : "none"}
              />
            </button>

            <Link href={`/produto/${produto.id}`} className="block p-2">
              <p className="text-sm font-medium leading-tight text-gray-700">
                {produto.nome}
              </p>
              <p className="text-gray-500 text-sm">{produto.preco}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Botão inferior */}
      <button className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg">
        <ShoppingCart className="w-5 h-5" />
        <span>Adicionar tudo ao carrinho</span>
      </button>

      <MenuInferior />
    </div>
  );
}
