import React, {Component} from "react";
import './css/frontpage_style.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Form, FormControl } from 'react-bootstrap';
import Login from './Login';

class NavigationBar extends Component {
    render() {
        return (<Navbar className="header" expand="lg">
                        <Navbar.Brand className="navLogo" style={{float: "left"}} href="/">Sivun logo</Navbar.Brand>
                          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                          <Navbar.Collapse className="navCollapse" id="basic-navbar-nav">
                            <Form className="navForm" inline>
                              <FormControl type="text" placeholder="Hae tuotetta tai tuottajaa.." className="search" />
                              <Button className="navFormButton" variant="light">Hae</Button>
                            </Form>
                            <Nav className="navLinks">
                              <Nav.Link className="navProducts" href="/tuotteet/">TUOTTEET</Nav.Link>
                              <NavDropdown className="navAccount" title="OMA TILI" id="userDropdown">
                                <NavDropdown.Item href="/login/">OMA TILI</NavDropdown.Item>
                                <NavDropdown.Item>{<Login/>}</NavDropdown.Item>
                              </NavDropdown>
                              <NavDropdown className="navShoppingcart" title="OSTOSKORI (0)" id="shoppingcartDropdown">
                                <NavDropdown.Item href="/ostoskori/" >OSTOSKORI</NavDropdown.Item>
                              </NavDropdown>
                            </Nav>
                          </Navbar.Collapse>
                        </Navbar>)
    }
}

export default NavigationBar;