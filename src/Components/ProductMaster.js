import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Form, Col, Container, Button, Nav } from "react-bootstrap";
import * as yup from "yup";
import { firestore } from "firebase/app";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import useProduct from "../hooks/useProduct";

const productSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(2, "Name is too short")
    .max(25, "Name is too large"),
  manufacturer: yup.string().required(),
  price: yup
    .number()
    .typeError("price must be numeric")
    .positive("should be positive"),
  inStock: yup.boolean().notRequired(),
  Category: yup.string().required(),
});
function ProductMaster() {
  const { id } = useParams();
  const [product, isLoading] = useProduct(id);
  const [isSubmitting, setSubmitting] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      manufacturer: "",
      price: 0,
      inStock: false,
      Category: "",
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      let castedValues = productSchema.cast(values);
      setSubmitting(true);
      let productDoc = undefined;
      if (id) {
        productDoc = firestore().collection("productMaster").doc(id);
      } else {
        productDoc = firestore().collection("productMaster").doc();
        castedValues = { ...castedValues, id: productDoc.id };
      }
      productDoc
        .set(castedValues, { merge: true })
        .then(() => {
          alert("Product successfully saved");
          resetForm();
          history.push("/ProductList");
        })
        .catch(() => {
          alert(`error ocurred while saving product`);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });
  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    resetForm,
    setValues,
  } = formik;
  useEffect(() => {
    if (product) {
      console.log(product);
      setValues(product);
    }
  }, [product, setValues]);
  return (
    <Container>
      {/* {isLoading ? "Loading....." : null} */}
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              id="name"
              name="name"
              value={values.name}
              onInput={handleChange}
            />
            {errors.name && touched.name ? (
              <div className="code">{errors.name}</div>
            ) : null}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="150"
              name="price"
              id="price"
              value={values.price}
              onInput={handleChange}
            />
            {errors.price && touched.price ? (
              <div className="color-red">{errors.price}</div>
            ) : null}
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            placeholder="Apartment, studio, or floor"
            id="description"
            name="description"
            onInput={handleChange}
            value={values.description}
          />
          {errors.description && touched.description ? (
            <div className="color-red">{errors.description}</div>
          ) : null}
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Qty</Form.Label>
            <Form.Control
              placeholder="5"
              name="qty"
              id="qty"
              value={values.qty}
              onInput={handleChange}
            />
            {errors.qty && touched.qty ? (
              <div className="color-red">{errors.qty}</div>
            ) : null}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={values.Category}
              name="Category"
              id="Category"
              onInput={handleChange}
            >
              <option value="">Select</option>
              <option value="Febric"> Febric</option>
              <option value="Electronics">Electronics</option>
              <option value="Others">Others</option>
            </Form.Control>
            {errors.Category && touched.Category ? (
              <div className="color-red">{errors.Category}</div>
            ) : null}
          </Form.Group>
        </Form.Row>
        <Form.Group id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="In Stock"
            name="inStock"
            id="inStock"
            onInput={handleChange}
            value={values.inStock}
            checked={values.inStock ? true : false}
          />
          {errors.inStock && touched.inStock ? (
            <div className="color-red">{errors.inStock}</div>
          ) : null}
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Manufacturer</Form.Label>
          <Form.Control
            placeholder="TVS"
            name="manufacturer"
            id="manufacturer"
            onInput={handleChange}
            value={values.manufacturer}
          />
          {errors.manufacturer && touched.manufacturer ? (
            <div className="color-red">{errors.manufacturer}</div>
          ) : null}
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Button
              variant="warning text-white float-righ"
              disable={isSubmitting.toString()}
            >
              {isSubmitting ? `Saving...` : `Save`}
            </Button>
          </Form.Group>
          <Form.Group as={Col}>
            <Nav.Link as={Link} to="/ProductList">
              <Button variant="warning text-white">Return Back</Button>
            </Nav.Link>
          </Form.Group>
        </Form.Row>
      </Form>
    </Container>
  );
}
export default ProductMaster;
