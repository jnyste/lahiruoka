import React, {Component} from "react";
import './css/OrdersPage_style.css';
import SingleOrder from "./SingleOrder";

class FarmOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newOrders: []
            , acceptedOrders: []
        }
    }

    componentDidMount() {
        fetch('/api/users/' + localStorage.getItem('userId') + '/orders')
            .then((resp) => resp.json())
            .then((orders) => {
                let newArray = [];
                let acceptedArray = [];
                for (let order of orders) {
                    if(!order.acceptedByFarmer) {
                        newArray.push(<SingleOrder key={order.orderId} order={order}/>);
                    } else {
                        acceptedArray.push(<SingleOrder key={order.orderId} order={order}/>);
                    }

                }
                this.setState({newOrders: newArray
                    , acceptedOrders: acceptedArray});
            });
    }

    render() {
        return(
            <div className="ordercontainer">
                <h1 className="ordertitle">Hyväksymättömät tilaukset</h1>
                {this.state.newOrders}
                <h1 className="ordertitle">Hyväksytyt tilaukset</h1>
                {this.state.acceptedOrders}
            </div>
        )
    }
}

export default FarmOrders;
