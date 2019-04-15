import React, {Component} from "react";
import './css/OrdersPage_style.css';
import SingleOrder from "./SingleOrder";

class FarmOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newOrders: []
            , acceptedOrders: []
            , declinedOrders: []
        }
    }

    componentDidMount() {
        fetch('/api/users/' + localStorage.getItem('userId') + '/orders')
            .then((resp) => resp.json())
            .then((orders) => {
                let newArray = [];
                let acceptedArray = [];
                let declinedArray = [];
                for (let order of orders) {
                    if(order.declinedByFarmer) {
                        declinedArray.push(<SingleOrder key={order.orderId} order={order}/>);
                    } else {
                        if(!order.acceptedByFarmer) {
                            newArray.push(<SingleOrder key={order.orderId} order={order}/>);
                        } else {
                            acceptedArray.push(<SingleOrder key={order.orderId} order={order}/>);
                        }
                    }

                }
                this.setState({newOrders: newArray
                    , acceptedOrders: acceptedArray
                    , declinedOrders: declinedArray});
            });
    }

    render() {
        return(
            <div className="ordercontainer">
                <h2 className="ordertitle">Hyväksymättömät tilaukset</h2>
                {this.state.newOrders.length <= 0 ?
                    <p>Ei hyväksyttäviä tilauksia.</p>
                    :
                    this.state.newOrders
                }
                <br/>
                <h2 className="ordertitle">Hyväksytyt tilaukset</h2>
                {this.state.acceptedOrders.length <= 0 ?
                    <p>Ei hyväksyttyjä tilauksia.</p>
                    :
                    this.state.acceptedOrders
                }
                <h2 className="ordertitle">Kieltäydytyt tilaukset</h2>
                {this.state.declinedOrders.length <= 0 ?
                    <p>Ei kieltäydyttyjä tilauksia.</p>
                    :
                    this.state.declinedOrders
                }
            </div>
        )
    }
}

export default FarmOrders;
