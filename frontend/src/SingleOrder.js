import React, {Component} from "react";
import './css/OrdersPage_style.css';

class SingleOrder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="singleordercontainer">
                <h3>Tilattu tuote: {this.props.order.product.name}</h3>
                <p>Tilauspäivä: {this.props.order.dateOfOrder}</p>
                <p>Hinta: {this.props.order.product.price}</p>
                <p>Määrä: {this.props.order.amount}</p>
                <br/>
                <p>Tilaaja: {this.props.order.orderer.companyName}</p>
                <p>Toimitusosoite: {this.props.order.orderer.address}</p>
                <p>Puhelinnumero: {this.props.order.orderer.phone}</p>
                <br/>
                <p>Toimituspäivä: {this.props.order.dateOfDelivery}</p>
                {!this.props.order.acceptedByFarmer &&
                    <div className="orderbutton">
                        <button className="acceptOrderButton">Hyväksy</button>
                        <button className="declineOrderButton">Kieltäydy tilauksesta</button>
                    </div>
                }

            </div>
        );
    }
}

export default SingleOrder;
