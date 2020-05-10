import React, { useState } from "react";
import { Row, Container, Form, Col, Button, Nav } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { auth } from "firebase/app";
function Login() {
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [isSubmitting, setSubmitting] = useState(false);

  const history = useHistory();
  const onTextBoxKeyPress = (e) => {
    const clonedProfile = { ...signInData, [e.target.name]: e.target.value };

    setSignInData(clonedProfile);
  };
  const onSignIn = () => {
    console.log(signInData);
    setSubmitting(true);

    auth()
      .signInWithEmailAndPassword(signInData.email, signInData.password)
      .then((data) => {
        history.push("/");
        console.log("sign-in successful", data);
      })
      .catch((e) => {
        console.log("error ocurred", e);
        alert(e.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <Form>
      <Container>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email"
              onInput={onTextBoxKeyPress}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onInput={onTextBoxKeyPress}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Button
              variant="primary float-right"
              onClick={onSignIn}
              disable={isSubmitting.toString()}
            >
              {isSubmitting ? `Loading...` : `Login`}
            </Button>
          </Form.Group>
          <Form.Group as={Col}>
            <Button variant="danger">Cancel</Button>
          </Form.Group>
          <Form.Group as={Col}>
            <Link to="/sign-up">
              <Button variant="warning text-white">New user ? Sign Up</Button>
            </Link>
          </Form.Group>
        </Form.Row>
      </Container>
    </Form>
  );
}
export default Login;
