import React, { Component } from 'react';
import './css/header_style.css';

class Header extends Component {

  state = {};

  render() {
    return (
      <nav>
          <a href="">SIVUN LOGO</a>
          <input type="text" placeholder="Hae tuotetta tai tuottajaa.." name="search" />
          <button type="submit">Hae</button>
          <a className="right_float" href="">Kirjaudu ulos</a>
          <a className="right_float" href="">Hei, Käyttäjä!</a>
      </nav>
    );
  }
}

export default Header;
