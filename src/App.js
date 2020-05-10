import React, { useState, useEffect, createContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ProductMaster from "./Components/ProductMaster";
import ProductList from "./Components/ProductList";
import ProductInfo from "./Components/ProductView";
import productCard from "./Components/ProductCard";
import Country from "./Components/Country";
import CountryList from "./Components/CountryList";

import { auth, firestore } from "firebase/app";
import { CartContextProvider } from "./context/CartContext";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth().onAuthStateChanged((authUser) => {
      console.log("inside onAuthStateChanged", authUser);
      if (authUser) {
        firestore()
          .collection("user-profiles")
          .doc(authUser.email)
          .get()
          .then((doc) => {
            const userProfileData = doc.data();
            setUser({ ...authUser, ...userProfileData });
          })
          .catch((e) => {
            console.log(`error occurred while loading uer info`);
          });
      } else {
        setUser(undefined);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <CartContextProvider>
        <BrowserRouter>
          <Header />

          <Switch>
            {user && (
              <>
                <Route path={"/view-productInfo/:id"}>
                  <ProductInfo></ProductInfo>
                </Route>
                <Route path={"/view-productCard"}>
                  <productCard></productCard>
                </Route>

                <Route path={"/edit-product/:id"}>
                  <ProductMaster />
                </Route>
                <Route path={"/product-master"}>
                  <ProductMaster />
                </Route>
                <Route path={"/Country"}>
                  <Country />
                </Route>
                <Route path={"/CountryList"}>
                  <CountryList />
                </Route>
              </>
            )}

            <Route path={"/Login"}>
              <Login />
            </Route>
            <Route path={"/ProductList"}>
              <ProductList />
            </Route>
            <Route path={"/sign-up"}>
              <SignUp />
            </Route>
            <Route exact path={"/"}>
              <Home />
            </Route>
            <Route path="*">
              <h1>404 Not found</h1>
            </Route>
          </Switch>
        </BrowserRouter>
      </CartContextProvider>
    </UserContext.Provider>
  );
}

export default App;
