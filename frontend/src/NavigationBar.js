import React, {Component} from "react";
import './css/frontpage_style.css';
import logo from './img/lahiruoka_logo.png';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import Login from './Login';
import ShoppingCart from './ShoppingCart';

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
            <Navbar className="header mr-auto" expand="lg">
                <Navbar.Brand className="navLogo" style={{float: "left"}} href="/"><img src={logo} className="lahiruokalogo" style={{paddingLeft:"20px", paddingRight:"20px"}}/></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                  <Navbar.Collapse className="navCollapse" id="basic-navbar-nav">
                    <Form onSubmit={this.search} className="navForm" inline>
                      <FormControl onChange={this.updateSearchWord} type="text" placeholder="Hae tuotetta..." className="search" />
                      <Button href={'/etsi/' + this.state.searchWord} type="submit" className="navFormButton" variant="light">Hae</Button>
                    </Form>
                    <Nav className="navLinks">
                      <Nav.Link className="navProducts" href="/tuotteet/" style={{paddingLeft:"20px"}}>TUOTTEET</Nav.Link>
                    </Nav>
                        <Nav className="ml-auto" style={{paddingRight:"20px"}}>
                      <NavDropdown className="navAccount" title="OMA TILI" id="dropdown-menu-align-center" alignRight >
                        {this.isLogged()}
                        <NavDropdown.Item>{<Login/>}</NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown className="navShoppingcart" title="OSTOSKORI (0)" id="shoppingcartDropdown" alignRight >
                        <NavDropdown.Item>{<ShoppingCart/>}</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>)
    }
}

export default NavigationBar;