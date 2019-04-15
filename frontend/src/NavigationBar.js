import React, {Component} from "react";
import './css/frontpage_style.css';
import logo from './img/lahiruoka_logo.png';
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import Login from './Login';
import ShoppingCart from './ShoppingCart';

class NavigationBar extends Component {

    constructor() {
        super();
        let deliveryDate = localStorage.getItem('deliveryDate') === null ? '' : localStorage.getItem('deliveryDate');
        if(new Date(deliveryDate) < Date.now()) {
            deliveryDate = '';
        }
        this.state = {searchWord: ''
                    , deliveryDate: deliveryDate
                    , loggedin: localStorage.getItem('loggedin')};
        this.updateSearchWord = this.updateSearchWord.bind(this);
        this.isLogged = this.isLogged.bind(this);
        this.search = this.search.bind(this);
        this.updateNavbar = this.updateNavbar.bind(this);
    }

    updateNavbar(loginStatus) {
        this.setState({loggedin: loginStatus});
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if(new Date(value) < Date.now()) {
            alert('Et voi valita jo mennyttä päivää!');
            localStorage.setItem('deliveryDate', '');
            this.setState({
                deliveryDate: ''
            });
        } else {
            this.setState({
                [name]: value
            });
            localStorage.setItem('deliveryDate', value);
        }
    };

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
                    <Form onSubmit={this.search} className="navForm" inline  style={{marginBottom:"7px"}}>
                      <FormControl onChange={this.updateSearchWord} type="text" placeholder="Hae tuotetta..." className="search" />
                      <Button href={'/etsi/' + this.state.searchWord} type="submit" className="navFormButton" variant="light">Hae</Button>
                    </Form>
                    <Nav className="navLinks">
                      <Nav.Link className="navProducts" href="/tuotteet/" style={{paddingLeft:"20px", paddingTop:"0px"}}>TUOTTEET</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto" style={{paddingRight:"20px"}}>
                        { (localStorage.getItem('loggedin') === "true" && localStorage.getItem('userType') === 'KITCHEN') &&
                        <div>
                            <p className="navDateLabelli" style={{paddingTop:"7px"}}>Valitse toimituspäivä:</p>
                            <input type="date" className="deliveryDate" name="deliveryDate" value={this.state.deliveryDate} onChange={this.handleChange}/>
                        </div>
                        }
                      <NavDropdown className="navAccount" title="OMA TILI" id="dropdown-menu-align-center" alignRight >
                        {this.isLogged()}
                        <NavDropdown.Item>{<Login updateNavbar={this.updateNavbar}/>}</NavDropdown.Item>
                      </NavDropdown>
                      <NavDropdown className="navShoppingcart" title="TILAUKSET" id="shoppingcartDropdown" alignRight >
                        <NavDropdown.Item>{<ShoppingCart loggedin={this.state.loggedin}/>}</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>)
    }
}

export default NavigationBar;