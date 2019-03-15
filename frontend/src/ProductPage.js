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
                    <h3 className="product title">Porkkana</h3>
                    <p className="product owner">Esimerkin tila</p>
                    <p>Saatavilla yht. 300kg<br/>Erätiedot:</p>
                    <p className="tags">#tag #porkkana #epic</p>
                </div>
                <div className="order">
                    <div className="floatTis">
                        <select>
                            <option value="0">Valitse erä...</option>
                            <option value="1">5kg</option>
                            <option value="2">10kg</option>
                        </select>
                    </div>
                    <div className="floatTis">
                        <form>
                            <input type="text" name="kpl" className="kplBox"/>
                        </form>
                    </div>
                    <div className="floatTis kplText">
                        <p>Kpl</p>
                    </div>
                    <div className="floatTis">
                        <input type="date" name="deliverydate" id="deliverypicker"/>
                    </div>
                    <div className="floatTis total">
                        <p>Tilattu yht. 0kg<br/>Hinta: 0€</p>
                    </div>
                    <div className= "floatTis">
                        <button name="name" value="value" type="submit">Lisää ostoskoriin</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default ProductPage;