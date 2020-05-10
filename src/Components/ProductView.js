import React from "react";
import { useParams, Link } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { Card } from "react-bootstrap";

function ProductView() {
  const { id } = useParams();
  console.log(id);

  const [product, isLoading] = useProduct(id);
  console.log(product);

  return (
    <>
      {product ? (
        <Card>
          <Card.Header>{product.name}</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>Price - {product.price}</p>
              <p>Manufacturer - {product.manufacturer}</p>
              <p>Qty - {product.qty}</p>
            </blockquote>
          </Card.Body>
        </Card>
      ) : isLoading ? (
        <span>Loading...</span>
      ) : null}
    </>
  );
}
export default ProductView;
