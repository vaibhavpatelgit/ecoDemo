import React from "react";
import ProductCard from "./ProductCard";
import { Card, Button, CardDeck } from "react-bootstrap";
import useProducts from "../hooks/useProducts";
import DisplayProduct from "./DisplayProduct";

function Home() {
  const [products, isLoading] = useProducts();
  return (
    <>
      <h1>Home Page!!</h1>
      <CardDeck>
        {products
          ? products.map((product) => (
              <DisplayProduct
                product={product}
                key={product.id}
              ></DisplayProduct>
            ))
          : null}
      </CardDeck>
    </>
  );
}
export default Home;
