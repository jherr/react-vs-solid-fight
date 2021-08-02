import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../product";

export const HomePage: React.FunctionComponent<{
  products: Product[];
  onAddToCart: (product: Product) => void;
  search: string;
}> = ({ products, onAddToCart, search }) => {
  const filteredProducts = useMemo(
    () =>
      (products ?? []).filter(
        (product) =>
          product.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          product.description
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
      ),
    [products, search]
  );

  return (
    <div className="grid grid-cols-3">
      {filteredProducts.map((product) => (
        <Link
          to={`/detail/${product.id}`}
          key={product.id}
          className="m-2 border border-1 border-blue-600 rounded-t-lg bg-blue-600"
        >
          <h3 className="title font-bold truncate w-full max-w-full py-2 px-4 text-white">
            {product.title}
          </h3>
          <div className="bg-white p-3">
            <div className="w-full flex justify-center">
              <img src={product.image} alt={product.title} className="h-32" />
            </div>
            <div>
              <div className="text-lg overflow-ellipsis description">
                {product.description}
              </div>
              <div className="flex flex-row mt-2">
                <div className="text-md mt-1">{product.category}</div>
                <div className="text-lg text-right flex-grow justify-end mt-1 mr-4 font-bold">
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
                <button
                  onClick={(evt) => {
                    evt.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="text-lg px-8 py-1 font-bold bg-blue-800 text-white rounded-full"
                >
                  <i className="fas fa-cart-plus mr-2"></i>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
