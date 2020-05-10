import React, { useState } from "react";
import { Container, Form, Col, Button, Nav } from "react-bootstrap";
import { auth } from "firebase/app";
import { useHistory, Link } from "react-router-dom";
function SignUp() {
  const [signUpData, setProfile] = useState({ email: "", password: "" });
  const [isSubmitting, setSubmitting] = useState(false);

  const history = useHistory();
  const onTextBoxKeyPress = (e) => {
    const clonedProfile = { ...signUpData, [e.target.name]: e.target.value };

    setProfile(clonedProfile);
    console.log(e.target.value);
  };

  const onTextBoxKeyPressCheck = (e) => {
    console.log(e.target.value);
  };

  const onSignUp = () => {
    setSubmitting(true);

    auth()
      .createUserWithEmailAndPassword(
        signUpData.email.trim(),
        signUpData.password
      )
      .then((data) => {
        auth()
          .signInWithEmailAndPassword(
            signUpData.email.trim(),
            signUpData.password
          )
          .then(() => {
            history.push("/");
          });
        console.log("signup successful", data);
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
              onClick={onSignUp}
              disable={isSubmitting.toString()}
            >
              {isSubmitting ? `Loading...` : `Create Account`}
            </Button>
          </Form.Group>
          <Form.Group as={Col}>
            <Button variant="danger">Cancel</Button>
          </Form.Group>
          <Form.Group as={Col}>
            <Nav.Link as={Link} to="/Login">
              <Button variant="warning text-white">Already Account ?</Button>
            </Nav.Link>
          </Form.Group>
        </Form.Row>
      </Container>
    </Form>
  );
}
export default SignUp;
