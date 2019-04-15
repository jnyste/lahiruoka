import React, {Component} from "react";

class ShoppingCart extends Component {

    constructor(props) {
        super(props);
        let status = (localStorage.getItem('loggedin') === 'true') ? 'loggedin' : 'loggedout';
        this.state = {status: status
                    , orderAmount: 0
                    , fetching: true};
        this.loggedoutRender = this.loggedoutRender.bind(this);
        this.loggedinRender = this.loggedinRender.bind(this);
        this.checkFarmOrders = this.checkFarmOrders.bind(this);
    }

    componentDidMount() {
        this.checkFarmOrders();
    }

    loggedoutRender() {
        return (<p>Kirjaudu sisään "Oma tili"-valikosta<br />tarkastellaksesi tilauksiasi.</p>);
    }

    loggedinRender(orderAmount) {
        if(localStorage.getItem('userType') === 'KITCHEN') {
            return (<p>Tarkastele tilauksiasi</p> );
        } else if (localStorage.getItem('userType') === 'FARM') {
            if (!this.state.fetching) {
                setTimeout(this.checkFarmOrders, 60000);
                this.setState({fetching: true});
            }
            return (
                <div>
                    <p style={{textAlign:"center", fontWeight:"bold"}}>Tilaussivu</p>
                    <p>Sinulle on {orderAmount} uutta tilausta.</p>
                </div>
            );
        } else {
            return (<p>ERROR, kokeile päivittää sivu.</p>);
        }
    }

    checkFarmOrders() {
        var orderAmount = 0;
        fetch('/api/users/' + localStorage.getItem('userId') + '/orders')
            .then((resp) => resp.json())
            .then((orders) => {
                let helper = 0;
                if(orders.length > 0) {
                    for (let order of orders) {
                        if(order.confirmedByOrderer) {
                            if (!order.declinedByFarmer && !order.acceptedByFarmer) {
                                helper++;
                            }
                        }
                    }
                }
                orderAmount = helper;
            }).finally(() => this.setState({orderAmount: orderAmount, fetching: false}));
    }

    render() {
        if(localStorage.getItem('loggedin') === 'true') {
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
