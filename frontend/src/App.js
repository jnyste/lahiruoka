import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {};

  componentDidMount() {
      setInterval(this.hello, 250);
  }

  hello = () => {
      fetch('/api/hello')
          .then(response => response.text())
          .then(message => {
              this.setState({msg: message});
              console.log(this.state.msg);
          });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <h3>{this.state.msg}</h3>
        </header>
      </div>
    );
  }
}

export default App;
