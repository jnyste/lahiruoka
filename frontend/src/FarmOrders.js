import React, {Component} from "react";
import './css/OrdersPage_style.css';
import SingleOrder from "./SingleOrder";

class FarmOrders extends Component {

    constructor(props) {
        super(props);
        this.updatePage = this.updatePage.bind(this);
        this.fetchOrders = this.fetchOrders.bind(this);
        this.acceptOrder = this.acceptOrder.bind(this);
        this.state = {
            newOrders: []
            , acceptedOrders: []
            , declinedOrders: []
        }
    }

    componentDidMount() {
        this.fetchOrders();
    }

    acceptOrder(order, productId, requestedAmount) {
        fetch('/api/orders/accept', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then(() => {
            fetch('/api/products/' + productId + '/amount', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestedAmount)
            }).then(() => {
                alert('Tilaus hyväksytty. Tieto lähetetty tilaajalle. Päivitä sivu, jos tiedot eivät päivittyneet.');
                //console.log('accepted done');
            })
        });
    }

    updatePage(event) {
        console.log('updatePage kutsuttu');
        if(event.target.name === 'accept') {
            const acceptedOrder = [event.target.value];

            let requestedAmount = 0;
            let availableAmount = 0;
            let productId = 0;

            fetch('/api/orders/' + acceptedOrder, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((orderJson) => orderJson.json()).then((orderObject) => {
                requestedAmount = orderObject.amount;
                availableAmount = orderObject.product.amount;
                productId = orderObject.product.productId;
            }).finally(() => {
                if (requestedAmount > availableAmount) {
                    alert('Et voi hyväksyä tilausta, koska tilauksen pyytämä määrä on suurempi kuin tuotteen määrä.');
                } else {
                    this.acceptOrder(acceptedOrder, productId, requestedAmount);
                }
            });
       } else if (event.target.name === 'decline') {
            const declined = [event.target.value];
            fetch('/api/orders/decline', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(declined)
            }).then(() => {
                alert('Tilaus peruutettu. Tieto lähetetty tilaajalle. Päivitä sivu, jos tiedot eivät päivittyneet.');
                //console.log('decline done');
            });
        }
        event.persist();
       this.fetchOrders();
    }

    fetchOrders() {
        let newArray = [];
        let acceptedArray = [];
        let declinedArray = [];
        fetch('/api/users/' + localStorage.getItem('userId') + '/orders')
            .then((resp) => resp.json())
            .then((orders) => {
                for (let order of orders) {
                    if(order.confirmedByOrderer) {
                        if(order.declinedByFarmer) {
                            declinedArray.push(<SingleOrder updateOrders={this.updatePage} key={order.orderId}
                                                            order={order} orderType={'Declined'}/>);
                        } else {
                            if (!order.acceptedByFarmer) {
                                newArray.push(<SingleOrder updateOrders={this.updatePage} key={order.orderId}
                                                           order={order} orderType={'New'}/>);
                            } else {
                                acceptedArray.push(<SingleOrder updateOrders={this.updatePage} key={order.orderId}
                                                                order={order} orderType={'Accepted'}/>);
                            }
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
                <h2 className="ordertitle">Hylätyt tilaukset</h2>
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
