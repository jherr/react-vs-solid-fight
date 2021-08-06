import { createSignal, createResource } from "solid-js";
import { createMutable } from "solid-js/store";
import { Product } from "./product";

export const cart = createMutable({
  products: JSON.parse(
    window.localStorage.getItem("cart") ?? "[]"
  ) as Product[],
  get total() {
    return this.products.reduce((total, product) => total + product.price, 0);
  },
  get count() {
    return this.products.length;
  },
  addProduct(product) {
    this.products.push(product);
    window.localStorage.setItem("cart", JSON.stringify(this.products));
  },
  clear() {
    this.products = [];
    window.localStorage.setItem("cart", JSON.stringify(this.products));
  },
});

export const [search, setSearch] = createSignal("");

export const [products] = createResource<Product[]>(
  () => fetch("http://fakestoreapi.com/products").then((res) => res.json()),
  {
    initialValue: [],
  }
);
