import React, { useContext } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth } from "firebase/app";
import { useCartContext } from "../context/CartContext";
import { UserContext } from "../App";
function Header() {
  const currentUser = auth().currentUser;
  const history = useHistory();
  const { cartItems } = useCartContext();
  const user = useContext(UserContext);
  function Logout() {
    auth().signOut();
    history.push("/");
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/">
                  Product
                </Nav.Link>
                <NavDropdown title="Master" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/product-master">
                    Modify Product
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ProductList">
                    Product List
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    User Side UI
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/view-productCard">
                    Product Card
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/Country">
                    Country
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              false
            )}
          </Nav>

          <Nav.Link as={Link} to="cart">
            Cart ({cartItems})
          </Nav.Link>
          {currentUser ? (
            <Nav>
              <Nav.Link onClick={Logout}>
                {/* Welcome,{user.email}
                {` `}Logout */}Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="Login">
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Header;
