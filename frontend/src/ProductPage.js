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
                    <p>Saatavilla yht. 300kg</p>
                    <p>Erätiedot:</p>
                    <p className="tags">#tag #porkkana #epic</p>
                </div>
                <div className="order">
                    <select>
                        <option value="0">Valitse erä...</option>
                        <option value="1">5kg</option>
                        <option value="2">10kg</option>
                    </select>
                    <form>
                        <input type="text" name="kpl" />
                        <p>Kpl</p>
                    </form>
                    <input type="date" name="deliverydate" id="deliverypicker"/>
                </div>
            </div>
        );
    }
}

export default ProductPage;