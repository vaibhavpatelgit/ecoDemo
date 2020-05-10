import React from "react";
import { useParams, Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { Card, Button, Nav } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";

function DisplayProduct(props) {
  const {
    product: { id, name, category, description, manufacturer, price, qty },
  } = props;

  const { displayInDetail, key } = props;
  const { onCartUpdate } = useCartContext();

  //console.log(product);
  return (
    <>
      <Card key={key}>
        <Card.Body>
          <Card.Title>
            {displayInDetail ? (
              { name }
            ) : (
              <Nav.Link as={Link} to={`/view-productInfo/${id}`}>
                {name}
              </Nav.Link>
            )}
          </Card.Title>
          <Card.Text>
            <p>Price - {price}</p>
            <p>Manufacturer - {manufacturer}</p>
            <p>Qty - {qty}</p>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={onCartUpdate}>
            Add To Cart
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}
export default DisplayProduct;
