import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestore } from "firebase/app";
import useProducts from "../hooks/useProducts";
import { Table } from "react-bootstrap";

function ProductList() {
  const [products, isLoading] = useProducts();
  console.log(products);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>By</th>
          <th>Qty</th>
          <th>View</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? "Loading....." : null}
        {products.map(
          ({ id, name, manufacturer, price, category, qty }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{name}</td>

              <td>{price}</td>
              <td>{manufacturer}</td>

              {/* <td>{category}</td> */}
              <td>{qty}</td>
              <td>
                <Link to={`/view-productInfo/${id}`}>View</Link>
              </td>
              <td>
                <Link to={`/edit-product/${id}`}>Edit</Link>
              </td>
              <td>Delete</td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
}
export default ProductList;
