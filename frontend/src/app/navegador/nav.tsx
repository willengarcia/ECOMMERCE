"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, ShoppingCart, User } from "lucide-react";

export default function MenuInferior() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm flex justify-around py-2">
      <Link
        href="/"
        className={`flex flex-col items-center ${
          isActive("/") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-xs">Home</span>
      </Link>

      <Link
        href="/favoritos"
        className={`flex flex-col items-center ${
          isActive("/favoritos") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <Heart className="w-5 h-5" />
        <span className="text-xs">Favoritos</span>
      </Link>

      <Link
        href="/carrinho"
        className={`flex flex-col items-center ${
          isActive("/carrinho") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="text-xs">Carrinho</span>
      </Link>

      <Link
        href="/perfil"
        className={`flex flex-col items-center ${
          isActive("/perfil") ? "text-blue-600" : "text-gray-500"
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-xs">Perfil</span>
      </Link>
    </nav>
  );
}
