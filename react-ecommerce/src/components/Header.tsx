import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../product";

export const Header: React.FunctionComponent<{
  cart: Product[];
  onClearCart: () => void;
  search: string;
  onSetSearch: (search: string) => void;
}> = ({ cart, onClearCart, search, onSetSearch }) => {
  const total = useMemo(
    () => (cart ? cart.reduce((total, p) => total + p.price, 0) : 0),
    [cart]
  );

  return (
    <div className="bg-blue-900 text-white flex flex-row w-full py-4">
      <div className="text-2xl px-10 py-2">
        <Link to="/">
          <i className="fas fa-donate mr-2"></i>
          Simple eCommerce
        </Link>
      </div>
      <div className="flex-grow">
        <input
          type="text"
          value={search}
          onChange={(evt) => onSetSearch(evt.target.value)}
          className="p-2 text-xl bg-white text-black rounded-lg max-w-md w-96"
        />
      </div>
      <div className="px-10 py-2 justify-end has-tooltip">
        <span className="tooltip cart">
          <div>Cart ({(cart ?? []).length})</div>
          {cart?.map((p, index) => (
            <div key={`${p.id}${index}`} className="flex flex-row my-2">
              <img src={p.image} alt={p.title} className="h-8 mr-2" />
              <h3 className="title text-md truncate flex-grow">{p.title}</h3>
              <div className="text-md text-right flex-grow justify-end ml-2">
                {p.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
          ))}
          <div className="flex">
            <button
              onClick={onClearCart}
              className="text-md px-8 py-1 font-bold bg-blue-800 text-white rounded-full"
            >
              Clear Cart
            </button>
            <div className="text-md text-right flex-grow justify-end ml-2">
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>
        </span>
        <i className="fas fa-shopping-cart mr-2"></i>
        <span className="font-bold text-xl">{(cart ?? []).length}</span>
      </div>
    </div>
  );
};
