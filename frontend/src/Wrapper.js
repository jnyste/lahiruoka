import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/frontpage_style.css';
import FarmCarousel from './FarmCarousel';

function Index() {
  return <FarmCarousel />;
}

function Profile() {
  return <h2>Oma tili</h2>;
}

function Products() {
  return <h2>Kaikki tuotteet</h2>;
}

function ShoppingCart() {
  return <h2>Ostoskori</h2>;
}

function Wrapper() {
  return (
    <Router>
      <div>
        <nav className="header">
          <Link to="/">Sivun logo</Link>
          <input type="text" placeholder="Hae tuotetta tai tuottajaa.." name="search" />
          <button type="submit">Hae</button>
          <Link to="/tuotteet">Tuotteet</Link>
          <Link to="/ostoskori/" className="right_float">Ostoskori (0)</Link>
          <Link to="/profiili/" className="right_float">Oma tili</Link>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/tuotteet/" component={Products} />
        <Route path="/ostoskori/" component={ShoppingCart} />
        <Route path="/profiili/" component={Profile} />

        <div className="footer"><span>Tähän mahtuu ainakin kaksi tai kolme riviä tekstiä jos tarpeen.</span></div>
      </div>
    </Router>
  );
}

export default Wrapper;
