import { Component, createMemo, For, createEffect } from "solid-js";
import { Link, useNavigate, useLocation } from "solid-app-router";

import { cart, clearCart, search, setSearch } from "../store";

export const Header: Component = () => {
  const total = createMemo(() =>
    cart ? cart().reduce((total, p) => total + p.price, 0) : 0
  );

  const navigate = useNavigate();
  const location = useLocation();

  createEffect(() => {
    if (search() !== "" && location.pathname !== "/") {
      navigate("/");
    }
  });

  return (
    <div class="bg-blue-900 text-white flex flex-row w-full py-4">
      <div class="text-2xl px-10 py-2">
        <Link href="/">
          <i class="fas fa-donate mr-2"></i>
          Simple eCommerce
        </Link>
      </div>
      <div class="flex-grow">
        <input
          type="text"
          value={search()}
          onkeyup={(evt) => setSearch(evt.currentTarget.value)}
          class="p-2 text-xl bg-white text-black rounded-lg max-w-md w-96"
        />
      </div>
      <div class="px-10 py-2 justify-end has-tooltip">
        <span class="tooltip cart">
          <div>Cart ({cart().length})</div>
          <For each={cart()}>
            {(p) => (
              <div class="flex flex-row my-2">
                <img src={p.image} alt={p.title} class="h-8 mr-2" />
                <h3 class="title text-md truncate flex-grow">{p.title}</h3>
                <div class="text-md text-right flex-grow justify-end ml-2">
                  {p.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
              </div>
            )}
          </For>
          <div class="flex">
            <button
              onClick={() => clearCart()}
              class="text-md px-8 py-1 font-bold bg-blue-800 text-white rounded-full"
            >
              Clear Cart
            </button>
            <div class="text-md text-right flex-grow justify-end ml-2">
              {total().toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>
        </span>
        <i class="fas fa-shopping-cart mr-2"></i>
        <span class="font-bold text-xl">{cart().length}</span>
      </div>
    </div>
  );
};
