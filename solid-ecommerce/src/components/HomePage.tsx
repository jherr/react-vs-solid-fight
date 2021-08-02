import { Component, createMemo, For, Show } from "solid-js";
import { Link } from "solid-app-router";

import { cart, products, search } from "../store";

const HomePage: Component = () => {
  const filteredProductIDs = createMemo(() =>
    (products() ?? [])
      .filter(
        (product) =>
          product.title
            .toLocaleLowerCase()
            .includes(search().toLocaleLowerCase()) ||
          product.description
            .toLocaleLowerCase()
            .includes(search().toLocaleLowerCase())
      )
      .map((p) => p.id)
  );

  return (
    <div class="grid grid-cols-3">
      <For each={products()}>
        {(product) => (
          <Show when={filteredProductIDs().includes(product.id)}>
            <Link
              href={`/detail/${product.id}`}
              class="m-2 border border-1 border-blue-600 rounded-t-lg bg-blue-600"
            >
              <h3 class="title font-bold truncate w-full max-w-full py-2 px-4 text-white">
                {product.title}
              </h3>
              <div class="bg-white p-3">
                <div class="w-full flex justify-center">
                  <img src={product.image} alt={product.title} class="h-32" />
                </div>
                <div>
                  <div class="text-lg overflow-ellipsis description">
                    {product.description}
                  </div>
                  <div class="flex flex-row mt-2">
                    <div class="text-md mt-1">{product.category}</div>
                    <div class="text-lg text-right flex-grow justify-end mt-1 mr-4 font-bold">
                      {product.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                    <button
                      onClick={(evt) => {
                        evt.preventDefault();
                        cart.addProduct(product);
                      }}
                      class="text-lg px-8 py-1 font-bold bg-blue-800 text-white rounded-full"
                    >
                      <i class="fas fa-cart-plus mr-2"></i>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </Show>
        )}
      </For>
    </div>
  );
};

export default HomePage;
