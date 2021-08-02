import { createSignal, createResource } from "solid-js";
import { Product } from "./product";

export const [cart, setCart] = createSignal<Product[]>([]);

export const addToCart = (product: Product) => setCart(cart().concat(product));

export const clearCart = () => setCart([]);

export const [search, setSearch] = createSignal("");

export const [products] = createResource<Product[]>(
  () => fetch("http://fakestoreapi.com/products").then((res) => res.json()),
  {
    initialValue: [],
  }
);
