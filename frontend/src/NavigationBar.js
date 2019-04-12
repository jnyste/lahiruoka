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
        this.isLogged = this.isLogged.bind(this);
        this.search = this.search.bind(this);
    }

    isLogged() {
      return localStorage.getItem('loggedin') === "true" ?
       <NavDropdown.Item href="/profiili/oma/">OMA TILI</NavDropdown.Item> : "";
    }

    updateSearchWord(event) {
        this.setState({searchWord: event.target.value});
    }

    search(event) {
        event.preventDefault();
    }

    render() {
        return (
            <Navbar className="header" expand="lg">
                <Navbar.Brand className="navLogo" style={{float: "left"}} href="/">Sivun logo</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                  <Navbar.Collapse className="navCollapse" id="basic-navbar-nav">
                    <Form onSubmit={this.search} className="navForm" inline>
                      <FormControl onChange={this.updateSearchWord} type="text" placeholder="Hae tuotetta..." className="search" />
                      <Button href={'/etsi/' + this.state.searchWord} type="submit" className="navFormButton" variant="light">Hae</Button>
                    </Form>
                    <Nav className="navLinks">
                      <Nav.Link className="navProducts" href="/tuotteet/">TUOTTEET</Nav.Link>
                      <NavDropdown className="navAccount" title="OMA TILI" id="dropdown-menu-align-center">
                        {this.isLogged()}
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