import React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Form, FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/frontpage_style.css';
import FarmCarousel from './FarmCarousel';
import ProductPage from './ProductPage';
import UserProfile from './UserProfile';
import AddProduct from './AddProduct';
import AddUser from './AddUser'
import Login from './Login';
import SearchProducts from './SearchProducts';
import NavigationBar from './NavigationBar';

function Index() {
  return <FarmCarousel />;
}

function Products() {
  return <ProductPage/>;
}

function ShoppingCart() {
  return <h1>Ostoskori</h1>;
}

function Wrapper() {
  if (localStorage.getItem('loggedin') === null) {
    localStorage.setItem('loggedin', 'false');
  }
  return (
    <Router>
      <div>
        <NavigationBar />

        <Route exact path="/" exact component={Index} />
        <Route exact path="/tuotteet/" component={Products} />
        <Route exact path="/ostoskori/" component={ShoppingCart} />
        <Route exact path="/profiili/:id" component={UserProfile} />
        <Route exact path="/tuotelisays/:id" component={AddProduct} />
        <Route exact path="/profiili/oma/:gid" component={AddUser} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/etsi/:keyWord" component={SearchProducts} />
        <Route exact path="/tag/:tag" component{SearchProducts} />

        <div className="footer"><span>Tähän mahtuu ainakin kaksi tai kolme riviä tekstiä jos tarpeen.</span></div>
      </div>
    </Router>
  );
}

export default Wrapper;
