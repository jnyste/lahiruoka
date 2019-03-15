import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Content() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/logout/" component={About} />
        <Route path="/user/" component={Users} />
      </Switch>
    </Router>
  );
}
export default Content;
