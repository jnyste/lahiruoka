import React, {Component} from "react";
import './css/OrdersPage_style.css';
import SingleOrder from "./SingleOrder";

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
                    helperArray.push(<SingleOrder key={order.orderId} order={order}/>);
                }
                this.setState({orders: helperArray});
            });
    }

    render() {
        return(
            <div className="ordercontainer">
                <h1 className="ordertitle">Hyväksymättömät tilaukset</h1>
                {this.state.orders}
                <h1 className="ordertitle">Hyväksytyt tilaukset</h1>
            </div>
        )
    }
}

export default FarmOrders;
