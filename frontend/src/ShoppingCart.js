import React, {Component} from "react";

class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.state = {status: 'loggedout'};
        this.loggedOutRender = this.loggedOutRender.bind(this);
    }

    componentDidMount() {
        console.log(localStorage);
    }

    loggedOutRender() {
        console.log('loggedout');
        return (<p>Kirjaudu sisään "Oma tili"-valikosta<br />tarkastellaksesi tilauksiasi.</p>);
    }

    render() {
        if(this.state.status === 'loggedout') {
            return (
                <div>
                    {this.loggedOutRender()}
                </div>
            );
        }
    }
}

export default ShoppingCart;
