import React, {Component} from "react";
import Collapsible from 'react-collapsible';

class SingleProduct extends Component {

    //String name, double price, double amount, LocalDate availableFrom, LocalDate availableTo, String info
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Collapsible trigger={this.props.id.name} triggerClassName="producttitletrigger" triggerOpenedClassName="productopenedtrigger" >
                    <div className="productinfo">
                        <h1 className="price">{this.props.id.price} €/kg</h1>
                        <h3 className="product title">{this.props.id.name}</h3>
                        <p className="product owner">Esimerkin tila</p>
                        <p className="productAmount">Saatavilla yht. {this.props.id.amount} kg</p>
                        <p className="productExtraInfo">Lisätiedot: {this.props.id.info}</p>
                        <p className="tags">#tag #porkkana #epic</p>
                    </div>
                    <div className="order">
                        <div className="floatTis">
                            <form>
                                <input type="text" name="kg" className="kgBox"/>
                            </form>
                        </div>
                        <div className="floatTis kgText">
                            <p>Kg</p>
                        </div>
                        <div className= "floatTis cart">
                            <button name="name" value="value" type="submit">Lisää ostoskoriin</button>
                        </div>
                        <div className="floatTis total">
                            <p>Veroton hinta: 1€<br/>Verollinen hinta: 100000€</p>
                        </div>
                    </div>
                </Collapsible>
            </div>
        );
    }
}

export default SingleProduct;
