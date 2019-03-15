import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './css/header_style.css'

function Index() {
  return <h2>Home</h2>;
}

function User() {
  return <h2>User</h2>;
}

function LogOut() {
  return <h2>Log out</h2>;
}

function Wrapper() {
  return (
    <Router>
      <div>
        <nav className="header">
          <Link to="/">Sivun logo</Link>
          <input type="text" placeholder="Hae tuotetta tai tuottajaa.." name="search" />
          <button type="submit">Hae</button>
          <Link to="/logout/" className="right_float">Kirjaudu ulos</Link>
          <Link to="/user/" className="right_float">Hei, Käyttäjä!</Link>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/user/" component={User} />
        <Route path="/logout/" component={LogOut} />
      </div>
    </Router>
  );
}

export default Wrapper;
