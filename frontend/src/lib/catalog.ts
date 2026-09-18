export type Product = {
  id: number; nome: string; slug: string; descricaoCurta: string; descricao: string;
  preco: number; precoPromocional: number | null; quantidadeEstoque: number;
  quantidadeReservada: number; estoqueMinimo: number; sku: string; peso: number;
  altura: number; largura: number; comprimento: number; mediaAvaliacao: number;
  totalAvaliacoes: number; status: string; dataCriacao: string; categoriaId: number;
  imagem?: string | null; imagemUrl?: string | null; urlImagem?: string | null;
  imagens?: Array<string | { url?: string; imagemUrl?: string }>;
};
export type ProductImage = { id: number; nomeArquivo: string; urlImagem: string; imagemPrincipal: boolean; dataCriacao: string; productId: number };
export type Category = { categoryId: number; name: string; description: string; ativo: boolean; dataAtualizacao: string };
export type CartItem = { cartItemId: number; quantidade: number; precoUnitario: number; subtotal: number; products: Pick<Product, "id" | "nome" | "slug" | "descricaoCurta" | "descricao" | "preco" | "sku"> & { imagem?: string | null } };
export type CartDetails = { cartItems: CartItem[]; cart: { id: number; status: string; valorTotal: number; customerId: number }; address: { id: number; rua: string; numero: string; cidade: string; estado: string; cep: string } | null };
export const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const salePrice = (product: Product) => product.precoPromocional ?? product.preco;
export const productImage = (product: Product) => {
  const first = product.imagens?.[0];
  return product.imagem ?? product.imagemUrl ?? product.urlImagem ?? (typeof first === "string" ? first : first?.url ?? first?.imagemUrl) ?? null;
};
