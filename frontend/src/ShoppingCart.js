import React, {Component} from "react";

class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        let status = (localStorage.getItem('loggedin') === 'true') ? 'loggedin' : 'loggedout';
        console.log('status: ' + status);
        this.state = {status: status
                    , orderAmount: 0
                    , fetching: true};
        this.loggedoutRender = this.loggedoutRender.bind(this);
        this.loggedinRender = this.loggedinRender.bind(this);
        this.checkFarmOrders = this.checkFarmOrders.bind(this);
    }

    componentDidMount() {
        console.log(this.props.loggedin);
        this.checkFarmOrders();
    }

    loggedoutRender() {
        return (<p>Kirjaudu sisään "Oma tili"-valikosta<br />tarkastellaksesi tilauksiasi.</p>);
    }

    loggedinRender(orderAmount) {
        if(localStorage.getItem('userType') === 'KITCHEN') {
            return (<p>Valittu toimituspäivä: {localStorage.getItem('deliveryDate')} </p> );
        } else if (localStorage.getItem('userType') === 'FARM') {
            if (!this.state.fetching) {
                setTimeout(this.checkFarmOrders, 60000);
                this.setState({fetching: true});
            }

            return (<p>Sinulle on {orderAmount} tilausta.</p>);
        } else {
            return (<p>ERROR, kokeile kirjautua ulos ja takaisin sisään.</p>);
        }
    }

    checkFarmOrders() {
        var orderAmount = 0;
        fetch('/api/users/' + localStorage.getItem('userId') + '/orders')
            .then((resp) => resp.json())
            .then((orders) => {
                console.log('user orders length: ', orders.length);
                orderAmount= orders.length;
            }).finally(() => this.setState({orderAmount: orderAmount, fetching: false}));
    }

    render() {
        if(this.props.loggedin) {
            return (
                <div>
                    {this.loggedinRender(this.state.orderAmount)}
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
