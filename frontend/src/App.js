import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import Home from './components/Home/Home'
import Marketplace from './components/Marketplace/Marketplace'
import AddProduct from './components/AddProduct/AddProduct'
import ProductDetail from './components/ProductDetail/ProductDetail'
import ProductSold from './components/ProductSold/ProductSold'
import Wishlist from './components/WishList/Wishlist'
import Nav from "./components/Navigation/Nav";
import Footer from "./components/Footer/Footer";
import EditProduct from "./components/EditProduct/EditProduct";

import Auth from './components/Auth/Auth';
const UserIDContext = React.createContext();

function App() {
  let user = JSON.parse(localStorage.getItem('profile'))
  console.log(user)
  console.log(user.result._id)
  let userID = user.result._id

  return (
    <Router>
      <UserIDContext.Provider value={userID}>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth/:id" component={Auth} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/editproduct/:id" component={EditProduct} />
          <Route path="/productdetail/:id" component={ProductDetail} />
          <Route path="/productsold" component={ProductSold} />
          <Route path="/wishlist" component={Wishlist} />
        </Switch>
        <Footer />
      </UserIDContext.Provider>
    </Router >
  );
}

export default App;
