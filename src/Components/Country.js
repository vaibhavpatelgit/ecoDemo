import React, { useState, useEffect } from "react";
import { useFormik } from "formik"; // add edit na code mate use thai.
import { Form, Col, Container, Button, Nav } from "react-bootstrap";
import * as yup from "yup";
import { firestore } from "firebase/app";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useCountry from "../hooks/useCountry";

/* ====================Validation Code Start ============================== */
const CountrySchema = yup.object().shape({
  name: yup.string().required(),
});

/* ====================Validation Code End ============================== */

function Country() {
  const { id } = useParams();
  //alert("get id", { id });

  const [country, isLoading] = useCountry(id);

  const [isSubmitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: CountrySchema,
    onSubmit: (values) => {
      console.log(values);
      let castedValues = CountrySchema.cast(values);
      setSubmitting(true);
      let CountryDoc = undefined;
      if (id) {
        CountryDoc = firestore().collection("Country").doc(id);
      } else {
        CountryDoc = firestore().collection("Country").doc();
        castedValues = { ...castedValues, id: CountryDoc.id };
      }
      CountryDoc.set(castedValues, { merge: true })

        .then((data) => {
          alert("Country successfully added");
        })
        .catch((e) => {
          console.log(e);
          alert(`error ocurred while saving country`);
        })
        .finally(() => {
          setSubmitting(false);
          resetForm();
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

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Country Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.X : India"
              id="name"
              name="name"
              value={values.name}
              onInput={handleChange}
            />
            {errors.name && touched.name ? (
              <div className="code">{errors.name}</div>
            ) : null}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Button
              variant="warning text-white float-righ"
              type="submit"
              disable={isSubmitting.toString()}
            >
              {isSubmitting ? `Saving...` : `Save`}
            </Button>
          </Form.Group>
          <Form.Group as={Col}>
            <Nav.Link as={Link} to="/CountryList">
              <Button variant="warning text-white" onClick={resetForm}>
                Return Back
              </Button>
            </Nav.Link>
          </Form.Group>
        </Form.Row>
      </Form>
    </Container>
  );
}
export default Country;
