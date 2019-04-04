import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/frontpage_style.css';
import FarmCarousel from './FarmCarousel';
import ProductPage from './ProductPage';
import UserProfile from './UserProfile';
import AddProduct from './AddProduct';

function Index() {
  return <FarmCarousel />;
}

function Profile() {
  return <UserProfile/>;
}

function Products() {
  return <ProductPage/>;
}

function ShoppingCart() {
  return <h2>Ostoskori</h2>;
}

function AddNewProduct() {
    return <AddProduct/>;
}

function Wrapper() {
  return (
    <Router>
      <div>
        <nav className="header">
          <Link to="/">Sivun logo</Link>
          <input type="text" placeholder="Hae tuotetta tai tuottajaa.." name="search" />
          <button type="submit">Hae</button>
          <Link to="/tuotteet/">Tuotteet</Link>
          <Link to="/ostoskori/" className="right_float">Ostoskori (0) <span
              className="glyphicon glyphicon-shopping-cart shoppingcart"></span></Link>
          <Link to="/profiili/" className="right_float">Oma tili</Link>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/tuotteet/" component={Products} />
        <Route path="/ostoskori/" component={ShoppingCart} />
        <Route path="/profiili/" component={Profile} />
        <Route path="/tuotelisays/:id" component={AddProduct} />

        <div className="footer"><span>Tähän mahtuu ainakin kaksi tai kolme riviä tekstiä jos tarpeen.</span></div>
      </div>
    </Router>
  );
}

export default Wrapper;
