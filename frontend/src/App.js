import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import Home from './components/Home/Home'
import Marketplace from './components/Marketplace/Marketplace'
import About from './components/AboutUs/About'
import AddProduct from './components/AddProduct/AddProduct'
import ProductDetail from './components/ProductDetail/ProductDetail'
import ProductSold from './components/ProductSold/ProductSold'
import Wishlist from './components/WishList/Wishlist'
import Nav from "./components/Navigation/Nav";
import Footer from "./components/Footer/Footer";
import EditProduct from "./components/EditProduct/EditProduct";
import Error from './components/404/Error'
import Auth from './components/Auth/Auth';
import { UserContext } from "./components/context/UserContext";

function App() {

  let user = JSON.parse(localStorage.getItem('profile'))
  console.log(user)
  console.log(user ? user.result._id : 'no logged user found')

  return (

    <Router>
      <UserContext.Provider value={user}>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth/:id" component={Auth} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/aboutus" component={About} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/editproduct/:id" component={EditProduct} />
          <Route path="/productdetail/:id" component={ProductDetail} />
          <Route path="/productsold" component={ProductSold} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="*" component={Error} />
        </Switch>
        <Footer />
      </UserContext.Provider >
    </Router >

  );
}

export default App;
