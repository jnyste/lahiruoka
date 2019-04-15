import React, {Component} from "react";
import './css/OrdersPage_style.css';

class SingleOrder extends Component {

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
                    <p>Toivottu toimituspäivä ja -aika: {this.props.order.dateOfDelivery} klo {this.props.order.timeOfDelivery.substring(0,5)}</p>
                    {localStorage.getItem('userType') === 'KITCHEN' ?
                        (!this.props.order.confirmedByOrderer &&
                            <div className="orderbutton">
                                <button className="acceptOrderButton" onClick={this.props.updateOrders} name="confirm"
                                        value={this.props.order.orderId}>Lähetä tilaus
                                </button>
                                <button className="declineOrderButton" onClick={this.props.updateOrders} name="cancel"
                                        value={this.props.order.orderId}>Peruuta
                                </button>
                            </div>
                        )
                        :
                        ((!this.props.order.acceptedByFarmer && !this.props.order.declinedByFarmer) &&
                            <div className="orderbutton">
                            <button className="acceptOrderButton" onClick={this.props.updateOrders} name="accept" value={this.props.order.orderId}>Hyväksy</button>
                            <button className="declineOrderButton" onClick={this.props.updateOrders} name="decline" value={this.props.order.orderId}>Kieltäydy tilauksesta</button>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default SingleOrder;
