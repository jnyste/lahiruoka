import React, {Component} from "react";
import './css/ProductPage_style.css';

class ProductPage extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="productbox">
                <div className="productinfo">
                    <h1 className="price">2.456 €/kg</h1>
                    <h3 className="product title">Porkkana</h3>
                    <p className="product owner">Esimerkin tila</p>
                    <p className="productAmount">Saatavilla yht. 300kg</p>
                    <p className="productExtraInfo">Lisätiedot: meillä on tarjolla vain parasta laatua! et saa yhtään homeista perunaa! tämän voimme taata! (lol ei me ees myydä perunaa)</p>
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
                    <div className="floatTis">
                        <input type="date" name="deliverydate" id="deliverypicker"/>
                    </div>
                    <div className="floatTis total">
                        <p>Tilattu yht. 0kg<br/>Hinta: 0€</p>
                    </div>
                    <div className= "floatTis cart">
                        <button name="name" value="value" type="submit">Lisää ostoskoriin</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPage;