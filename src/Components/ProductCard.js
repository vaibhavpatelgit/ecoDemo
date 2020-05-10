import React from "react";
import { useParams, Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { Card, Button, CardDeck } from "react-bootstrap";

function ProductCard() {
  const [product, isLoading] = useProducts();

  console.log(product);
  return (
    <>
      <CardDeck>
        {product.map(
          ({ id, name, manufacturer, price, category, qty }, index) => (
            <Card>
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                  <p>Price - {price}</p>
                  <p>Manufacturer - {manufacturer}</p>
                  <p>Qty - {qty}</p>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary">Add To Cart</Button>
              </Card.Footer>
            </Card>
          )
        )}
      </CardDeck>
    </>
  );
}
export default ProductCard;
