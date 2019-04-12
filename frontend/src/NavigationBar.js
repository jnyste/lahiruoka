import React, {Component} from "react";
import './css/frontpage_style.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Form, FormControl } from 'react-bootstrap';
import { BrowserRouter as Link } from "react-router-dom";
import Login from './Login';

class NavigationBar extends Component {

    constructor() {
        super();
        this.state = {searchWord: ''};
        this.updateSearchWord = this.updateSearchWord.bind(this);
    }

    updateSearchWord(event) {
        this.setState({searchWord: event.target.value});
    }

    render() {
        return (
            <Navbar className="header" expand="lg">
                <Navbar.Brand className="navLogo" style={{float: "left"}} href="/">Sivun logo</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                  <Navbar.Collapse className="navCollapse" id="basic-navbar-nav">
                    <Form className="navForm" inline>
                      <FormControl onChange={this.updateSearchWord} type="text" placeholder="Hae tuotetta..." className="search" />
                      <Button href={'/etsi/' + this.state.searchWord} className="navFormButton" variant="light">Hae</Button>
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