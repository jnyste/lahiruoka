import React, {Component} from "react";

class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        let status = (localStorage.getItem('loggedin') === 'true') ? 'loggedin' : 'loggedout';
        console.log('status: ' + status);
        this.state = {status: status};
        this.loggedoutRender = this.loggedoutRender.bind(this);
        this.loggedinRender = this.loggedinRender.bind(this);
    }

    componentDidMount() {
        console.log(localStorage);
    }

    loggedoutRender() {
        return (<p>Kirjaudu sisään "Oma tili"-valikosta<br />tarkastellaksesi tilauksiasi.</p>);
    }

    loggedinRender() {
        if(localStorage.getItem('userType') === 'KITCHEN') {
            return (<p>Keittiö.</p>);
        } else if (localStorage.getItem('userType') === 'FARM') {
            return (<p>Sinulle ei ole juuri nyt tilauksia.</p>);
        } else {
            return (<p>ERROR, kokeile kirjautua ulos ja takaisin sisään.</p>);
        }
    }

    render() {
        if(this.state.status === 'loggedin') {
            return (
                <div>
                    {this.loggedinRender()}
                </div>
            );
        } else {
            return (
                <div>
                    {this.loggedoutRender()}
                </div>
            );
        }
    }
}

export default ShoppingCart;
