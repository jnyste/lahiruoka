import React, {Component} from "react";
import './css/OrdersPage_style.css';

class SingleOrder extends Component {
    constructor(props) {
        super(props);
    }

    acceptButton = (event) => {
        console.log('jee hyväksytty')
        event.persist();
    };

    declineButton = (event) => {
        console.log('rip no ty')
        event.persist();
    };

    render() {
        return (
            <div className="singleordercontainer">
                <div className="ordertext">
                    <h4>Tilattu tuote: {this.props.order.product.name}</h4>
                    <p>Tilauspäivä: {this.props.order.dateOfOrder}</p>
                    <p>Määrä: {this.props.order.amount} kg</p>
                    <p>Hinta: {this.props.order.product.price} €/kg</p>
                    <br/>
                    <p>Tilaaja: {this.props.order.orderer.companyName}</p>
                    <p>Toimitusosoite: {this.props.order.orderer.address}</p>
                    <p>Puhelinnumero: {this.props.order.orderer.phone}</p>
                    <br/>
                    <p>Toimituspäivä: {this.props.order.dateOfDelivery}</p>
                    {!this.props.order.acceptedByFarmer &&
                        <div className="orderbutton">
                            <button className="acceptOrderButton" onClick={this.acceptButton}>Hyväksy</button>
                            <button className="declineOrderButton" onClick={this.declineButton}>Kieltäydy tilauksesta</button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default SingleOrder;
