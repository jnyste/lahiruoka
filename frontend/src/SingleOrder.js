import React, {Component} from "react";
import './css/OrdersPage_style.css';
import Collapsible from "react-collapsible";

class SingleOrder extends Component {

    render() {
        return (
            <div className="singleordercontainer">
                <Collapsible trigger={this.props.order.product.name + " - " + this.props.order.amount + " kg - Toimitus: " + this.props.order.dateOfDelivery + " klo " + this.props.order.timeOfDelivery.substring(0,5)} triggerClassName={"orderTitleTrigger" + this.props.orderType} triggerOpenedClassName={"orderOpenedTrigger" + this.props.orderType} >
                    <div className="ordertext">
                        <h4>Tilattu tuote: {this.props.order.product.name}</h4>
                        <p>Tilauspäivä: {this.props.order.dateOfOrder}</p>
                        <p>Määrä: {this.props.order.amount} kg
                        <br/>Hinta: {this.props.order.product.price} €/kg</p>
                        <p>Hinta yhteensä veroton: {Math.round(this.props.order.amount * this.props.order.product.price * 1000)/1000} €
                        <br/>Hinta yhteensä verollinen (14% ALV): {Math.round(this.props.order.amount * this.props.order.product.price * 1000 * 1.14)/1000} €</p>
                        <p>Tilaaja: {this.props.order.orderer.companyName}
                        <br/>Toimitusosoite: {this.props.order.orderer.address}
                        <br/>Puhelinnumero: {this.props.order.orderer.phone}</p>
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
                </Collapsible>
            </div>
        );
    }
}

export default SingleOrder;
