import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechSkill • Homologação",
  description: "E-commerce TechSkill em ambiente de homologação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
