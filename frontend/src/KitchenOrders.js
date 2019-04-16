import React, {Component} from "react";
import SingleOrder from "./SingleOrder";

class KitchenOrders extends Component {

    constructor(props) {
        super(props);
        this.updatePage = this.updatePage.bind(this);
        this.fetchOrders = this.fetchOrders.bind(this);
        this.state = {
            unconfirmedOrders: []
            , acceptedOrders: []
            , confirmedOrders: []
            , declinedOrders: []
        }
    }

    componentDidMount() {
        this.fetchOrders();
    }

    updatePage(event) {
        //console.log('updatePage kitchen kutsuttu');
        if(event.target.name === 'confirm') {
            //console.log('jee confirmattu', event.target.value);
            const confirmedOrder = [event.target.value];
            fetch('/api/orders/confirm', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(confirmedOrder)
            }).then(() => {
                alert('Tilaus lähetetty tuottajalle! Päivitä sivu, jos tiedot eivät päivittyneet.');
                this.fetchOrders();
            });
            event.persist();
        } else if (event.target.name === 'cancel') {
            //console.log('canceloitu', event.target.value);
            fetch('/api/orders/' + event.target.value, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                alert('Tilaus poistettu. Päivitä sivu, jos tiedot eivät päivittyneet.');
                this.fetchOrders();
            });
        }
        //this.fetchOrders();
    }

    fetchOrders() {
        let unconfirmedArray = [];
        let confirmedArray = [];
        let acceptedArray = [];
        let declinedArray = [];
        fetch('/api/users/' + localStorage.getItem('userId') + '/orders')
            .then((resp) => resp.json())
            .then((orders) => {
                //console.log(orders);
                for (let order of orders) {
                    if(order.declinedByFarmer) {
                        //console.log('order declined');
                        declinedArray.push(<SingleOrder updateOrders={this.updatePage} key={order.orderId} order={order} orderType={'Declined'}/>);
                    } else if(order.acceptedByFarmer) {
                        acceptedArray.push(<SingleOrder updateOrders={this.updatePage} key={order.orderId} order={order} orderType={'Accepted'}/>);
                    } else {
                        //console.log('ei oo declinetty');
                        if(!order.confirmedByOrderer) {
                            //console.log('ei oo confirmattu viel');
                            unconfirmedArray.push(<SingleOrder updateOrders={this.updatePage} key={order.orderId} order={order} orderType={'Waiting'}/>);
                        } else {
                            //console.log('on confirmattu');
                            confirmedArray.push(<SingleOrder updateOrders={this.updatePage} key={order.orderId} order={order} orderType={'New'}/>);
                        }
                    }

                }
            }).finally(() =>
            this.setState({
                unconfirmedOrders: unconfirmedArray
                , acceptedOrders: acceptedArray
                , confirmedOrders: confirmedArray
                , declinedOrders: declinedArray
            }));
    }

    render() {
        return(
            <div className="ordercontainer">
                <h2 className="ordertitle">Lähettämättömät tilaukset</h2>
                {this.state.unconfirmedOrders.length <= 0 ?
                    <p>Ei lähettämättömiä tilauksia.</p>
                    :
                    this.state.unconfirmedOrders
                }
                <br/>
                <h2 className="ordertitle">Lähetetyt tilaukset</h2>
                {this.state.confirmedOrders.length <= 0 ?
                    <p>Ei lähetettyjä tilauksia.</p>
                    :
                    this.state.confirmedOrders
                }
                <br/>
                <h2 className="ordertitle">Tuottajan hyväksymät tilaukset</h2>
                {this.state.acceptedOrders.length <= 0 ?
                    <p>Ei peruutettuja tilauksia.</p>
                    :
                    this.state.acceptedOrders
                }
                <br/>
                <h2 className="ordertitle">Tuottajan peruuttamat tilaukset</h2>
                {this.state.declinedOrders.length <= 0 ?
                    <p>Ei peruutettuja tilauksia.</p>
                    :
                    this.state.declinedOrders
                }
            </div>
        )
    }
}

export default KitchenOrders;
