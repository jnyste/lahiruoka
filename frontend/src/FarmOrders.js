import React, {Component} from "react";
import './css/OrdersPage_style.css';
import SingleOrder from "./SingleOrder";

class FarmOrders extends Component {

    constructor(props) {
        super(props);
        this.updatePage = this.updatePage.bind(this);
        this.fetchOrders = this.fetchOrders.bind(this);
        this.state = {
            newOrders: []
            , acceptedOrders: []
            , declinedOrders: []
        }
    }

    componentDidMount() {
        this.fetchOrders();
    }

    updatePage(event) {
        console.log('updatePage kutsuttu');
        if(event.target.name === 'accept') {
            console.log('jee hyväksytty', event.target.value);
            const acceptedOrder = [event.target.value];
            fetch('/api/orders/accept', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(acceptedOrder)
            }).then(() => {
                console.log('propsit: ',this.props);
            });
            event.persist();
       } else if (event.target.name === 'decline') {
            console.log('roskiin maailma');
        }
       this.fetchOrders();
    }

    fetchOrders() {
        let newArray = [];
        let acceptedArray = [];
        let declinedArray = [];
        fetch('/api/users/' + localStorage.getItem('userId') + '/orders')
            .then((resp) => resp.json())
            .then((orders) => {
                console.log(orders);
                for (let order of orders) {
                    if(order.declinedByFarmer) {
                        console.log('order declined');
                        declinedArray.push(<SingleOrder updateOrders={this.updatePage} key={order.orderId} order={order}/>);
                    } else {
                        console.log('ei oo declinetty');
                        if(!order.acceptedByFarmer) {
                            console.log('ei oo acceptattu viel');
                            newArray.push(<SingleOrder updateOrders={this.updatePage} key={order.orderId} order={order}/>);
                        } else {
                            console.log('on acceptattu');
                            acceptedArray.push(<SingleOrder updateOrders={this.updatePage} key={order.orderId} order={order}/>);
                        }
                    }

                }
            }).finally(() =>
                this.setState({newOrders: newArray
                    , acceptedOrders: acceptedArray
                    , declinedOrders: declinedArray}));

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
