"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid2X2, Heart, Home, ShoppingCart, User } from "lucide-react";
const links = [{ href: "/", label: "Home", icon: Home }, { href: "/favoritos", label: "Favoritos", icon: Heart }, { href: "/categorias", label: "Categorias", icon: Grid2X2 }, { href: "/carrinho", label: "Carrinho", icon: ShoppingCart }, { href: "/perfil", label: "Perfil", icon: User }];
export default function MenuInferior() {
  const pathname = usePathname();
  return <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto flex h-[78px] max-w-[720px] items-center justify-around border-t border-slate-200/80 bg-white/95 px-1 backdrop-blur">{links.map(({ href, label, icon: Icon }, index) => { const active = pathname === href || (href !== "/" && pathname.startsWith(href)); return <Link key={`${label}-${index}`} href={href} className={`flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-medium transition ${active ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:text-slate-800"}`}><Icon size={21} strokeWidth={active ? 2.5 : 2} /><span>{label}</span></Link>; })}</nav>;
}
