"use client";

import { Home, Box, ShoppingBag, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Início", icon: <Home className="w-5 h-5" /> },
    { href: "/produtos", label: "Produtos", icon: <Box className="w-5 h-5" /> },
    { href: "/pedidos", label: "Pedidos", icon: <ShoppingBag className="w-5 h-5" /> },
    { href: "/configuracao", label: "Configurações", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <footer className="bg-white shadow-inner p-3 flex justify-around text-gray-600">
      {links.map((link) => {
        const ativo = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center text-sm font-medium transition ${
              ativo ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {link.icon}
            <span className="text-xs mt-1">{link.label}</span>
          </Link>
        );
      })}
    </footer>
  );
}
