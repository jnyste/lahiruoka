import React, {Component} from "react";
import Collapsible from 'react-collapsible';

class SingleProduct extends Component {

    constructor(properites) {
        super(properites);
        this.state = {amount: 0};

        this.updateListener = this.updateListener.bind(this);
        this.addListener = this.addListener.bind(this);
    }

    updateListener(event) {
        this.state.amount = Number(event.target.value);
        this.addListener(event);
    }

    addListener(event) {
        let result = this.props.id.price * this.state.amount;
        result = parseFloat(Math.round(result * 1000) / 1000);
        let taxResult = parseFloat(Math.round(result * 1.14 * 1000) / 1000);
        this.setState({total:result});
        this.setState({totalTax:taxResult});
        
        event.preventDefault();
      }


    render() {
        return (
            <div>
                <Collapsible trigger={this.props.id.name + ' - ' + this.props.id.farm.companyName + ' - ' + this.props.id.price + ' €/kg'} triggerClassName="producttitletrigger" triggerOpenedClassName="productopenedtrigger" >
                    <div className="productinfo">
                        <h1 className="price">{this.props.id.price} €/kg</h1>
                        <h3 className="product title">{this.props.id.name}</h3>
                        <p className="product owner">{this.props.id.farm.companyName}</p>
                        <p className="productAmount">Saatavilla yht. {this.props.id.amount} kg</p>
                        <p className="productExtraInfo">Lisätiedot: {this.props.id.info}</p>
                        <p className="tags">#tag #porkkana #epic</p>
                    </div>
                    <div className="order">
                        <div className="floatTis">
                            <form>
                                <input type="text" name="kg" className="kgBox" onChange={this.updateListener}/>
                            </form>
                        </div>
                        <div className="floatTis kgText">
                            <p>Kg</p>
                        </div>
                        <div className= "floatTis cart">
                            <button name="name" value="value" type="submit">Lisää ostoskoriin</button>
                        </div>
                        <div className="floatTis total">
                            <p>Veroton hinta: {this.state.total}€<br/>Verollinen hinta: {this.state.totalTax}€</p>
                        </div>
                    </div>
                </Collapsible>
            </div>
        );
    }
}

export default SingleProduct;
