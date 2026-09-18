import { CartDetails, Category, Product, ProductImage } from "./catalog";
import { AuthSession, clearAuthSession, getAuthToken } from "./session";
const API_URL = "/backend";
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? getAuthToken() : null;
  const response = await fetch(`${API_URL}${path}`, { ...options, cache: "no-store", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options?.headers } });
  if (response.status === 401) { if (typeof window !== "undefined") { clearAuthSession(); window.location.assign(`/perfil?loginRequired=1&next=${encodeURIComponent(window.location.pathname + window.location.search)}`); } throw new Error("Sua sessão expirou. Entre novamente para continuar."); }
  if (response.status === 403) throw new Error("Você não tem autorização para realizar esta operação.");
  if (!response.ok) { const message = await response.text(); throw new Error(message || "Não foi possível concluir a operação."); }
  if (response.status === 204) return undefined as T;
  const body = await response.text();
  return (body ? JSON.parse(body) : undefined) as T;
}
export const getProductImages = (id: number) => request<ProductImage[]>(`/product/${id}/images`);
const imageCache = new Map<number, string | null>();
export async function getProductMainImage(id: number): Promise<string | null> {
  if (imageCache.has(id)) return imageCache.get(id) ?? null;
  try {
    const images = await getProductImages(id);
    const main = images.find((image) => image.imagemPrincipal) ?? images[0];
    const url = main?.urlImagem ?? null;
    imageCache.set(id, url);
    return url;
  } catch { imageCache.set(id, null); return null; }
}
async function withImage<T extends { id: number }>(product: T): Promise<T & { imagem?: string | null }> {
  return { ...product, imagem: await getProductMainImage(product.id) };
}
export type ProductPage = { content: Product[]; number: number; totalPages: number; totalElements: number; first: boolean; last: boolean; size: number; numberOfElements: number };
const productPageCache = new Map<string, ProductPage>();
export async function getProductsPage(page = 0, size = 12): Promise<ProductPage> {
  const key = `${page}:${size}`;
  const memory = productPageCache.get(key);
  if (memory) return memory;
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem(`techskill.products.${key}`);
    if (saved) { try { const cached = JSON.parse(saved) as { time: number; data: ProductPage }; if (Date.now() - cached.time < 300_000) { productPageCache.set(key, cached.data); return cached.data; } } catch { /* cache inválido: consulta o backend */ } }
  }
  const data = await request<ProductPage>(`/product/page?page=${page}&size=${size}`);
  productPageCache.set(key, data);
  if (typeof window !== "undefined") sessionStorage.setItem(`techskill.products.${key}`, JSON.stringify({ time: Date.now(), data }));
  return data;
}
export async function listProducts(): Promise<Product[]> { return (await getProductsPage()).content; }
export async function listProductsByPrice(): Promise<Product[]> { return request<Product[]>("/product/preco"); }
export async function listProductsByCategory(categoryId: number): Promise<Product[]> { return request<Product[]>(`/product/category/${categoryId}`); }
export async function searchCategories(name: string): Promise<Category[]> { const response = await fetch(`/api/categories?name=${encodeURIComponent(name)}`, { cache: "no-store" }); if (!response.ok) throw new Error(await response.text()); return response.json(); }
export async function listCategories(): Promise<Category[]> { const response = await fetch("/api/categories", { cache: "no-store" }); if (!response.ok) throw new Error(await response.text()); return response.json(); }
export async function getProduct(id: number): Promise<Product> { return withImage(await request<Product>(`/product/${id}`)); }
export const createCart = (customerId: number) => request<{ id?: number; cartId?: number }>("/cart", { method: "POST", body: JSON.stringify({ customerId }) });
export async function getCart(cartId: number, customerId: number): Promise<CartDetails> {
  const cart = await request<CartDetails>(`/cart/${cartId}/customer/${customerId}`);
  cart.cartItems = await Promise.all(cart.cartItems.map(async (item) => ({ ...item, products: await withImage(item.products) }))) as CartDetails["cartItems"];
  return cart;
}
export const addCartItem = (cartId: number, productId: number) => request("/cartItem", { method: "POST", body: JSON.stringify({ cartId, productId }) });
export const removeCartItem = (cartId: number, itemId: number) => request<void>(`/cartItem/cart/${cartId}/item/${itemId}`, { method: "DELETE" });
export const createOrder = (customerId: number, cartId: number, addressId: number) => request<{ orderId: number; valorTotal: number; status: string }>(`/order/${customerId}`, { method: "POST", body: JSON.stringify({ cartId, addressId }) });
export const createPayment = (orderId: number, metodoPagamento: string) => request<{ id?: number; paymentId?: number; status: string }>(`/payments/order/${orderId}`, { method: "POST", body: JSON.stringify({ metodoPagamento }) });
export const login = (email: string, senha: string) => request<AuthSession>("/auth/login", { method: "POST", body: JSON.stringify({ email, senha }) });
export type CustomerRegistration = { nomeCompleto: string; cpf: string; email: string; telefone: string; senha: string };
export const registerCustomer = (customer: CustomerRegistration) => request<void>("/customer", { method: "POST", body: JSON.stringify(customer) });
export type AddressRegistration = { customerId: number; nomeEndereco: string; nomeDestinatario: string; cep: string; rua: string; numero: string; complemento: string; bairro: string; cidade: string; estado: string };
export const registerAddress = (address: AddressRegistration) => request<void>("/address", { method: "POST", body: JSON.stringify(address) });
