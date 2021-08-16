import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import Home from './components/Home'
import Marketplace from './components/Home'
import AddProduct from './components/AddProduct'
import ProductDetail from './components/ProductDetail'
import ProductSold from './components/ProductSold'
import Wishlist from './components/Wishlist'
import Nav from "./components/Nav";
import Footer from "./components/Footer";


function App() {
  return (

    <Router>


      <Nav />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/addproduct" component={AddProduct} />
        <Route path="/productdetail" component={ProductDetail} />
        <Route path="/productsold" component={ProductSold} />
        <Route path="/wishlist" component={Wishlist} />
      </Switch>

      <Footer />

    </Router >

  );
}

export default App;
