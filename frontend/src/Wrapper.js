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
  return <h1>Ostoskori</h1>;
}

function Wrapper() {
  if (localStorage.getItem('loggedin') === null) {
    localStorage.setItem('loggedin', 'false');
  }
  return (
    <Router>
      <div>
        <Navbar className="header" expand="lg">
        <Navbar.Brand id="logo" style={{float: "left"}} href="/">Sivun logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
              <FormControl type="text" placeholder="Hae tuotetta tai tuottajaa.." className="search" />
              <Button style={{marginLeft: "3px"}} variant="light">Hae</Button>
            </Form>
            <Nav className="navLinks">
              <Nav.Link href="/tuotteet/">Tuotteet</Nav.Link>
              <NavDropdown title="Oma tili" id="userDropdown">
                <NavDropdown.Item href="/login/">Oma tili</NavDropdown.Item>
                <NavDropdown.Item>{<Login/>}</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Ostoskori (0)" id="shoppingcartDropdown">
                <NavDropdown.Item href="/ostoskori/" >Ostoskori</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route path="/" exact component={Index} />
        <Route path="/tuotteet/" component={Products} />
        <Route path="/ostoskori/" component={ShoppingCart} />
        <Route exact path="/profiili/oma" component={Profile} />
        <Route path="/tuotelisays/:id" component={AddProduct} />
        <Route path="/profiili/oma/:gid" component={AddUser} />
        <Route path="/login/" component={Login} />

        <div className="footer"><span>Tähän mahtuu ainakin kaksi tai kolme riviä tekstiä jos tarpeen.</span></div>
      </div>
    </Router>
  );
}

export default Wrapper;
