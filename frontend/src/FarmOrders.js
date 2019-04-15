import React, {Component} from "react";

class FarmOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        fetch('/api/users/' + localStorage.getItem('userId') + '/orders')
            .then((resp) => resp.json())
            .then((orders) => {
                let helperArray = [];
                for (let order of orders) {
                    helperArray.push(order);
                }
                this.setState({orders: helperArray});
            });
    }

    render() {
        let allOrders = this.state.orders;
        return(
            <div>
                <h1>Tilaukset sinulle</h1>
                <ul>
                {allOrders.map((order) =>
                    <li key={order.orderId}>{'Tilausnumero: ' + order.orderId +', tuote: ' + order.product.name + ', tilattu määrä: ' + order.amount
                    + 'kg, tilaaja: ' + order.orderer.companyName + ' osoite: ' + order.orderer.address + ', puhelinnro: ' + order.orderer.phone}</li>)}
                </ul>
            </div>
        )
    }
}

export default FarmOrders;
