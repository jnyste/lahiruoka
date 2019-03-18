import React, {Component} from "react";
import './css/ProductPage_style.css';

class ProductPage extends Component {

    state = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                for (let i=0; i<products.length; i++) {
                    let product = products[i];
                    let productname = product.name;
                    let productprice = product.price;
                    let productamount = product.amount;
                    let productfrom = product.availableFrom;
                    let productto = product.availableTo;
                    let productinfo = product.info;
                    let stateName = 'product' + i;
                    let price = stateName + 'price';
                    let amount = stateName + 'price';
                    let from = stateName + 'price';
                    let to = stateName + 'price';
                    let info = stateName + 'info';
                    this.setState({stateName: productname});
                    this.setState({price: productprice});
                    this.setState({amount: productamount});
                    this.setState({from: productfrom});
                    this.setState({to: productto});
                    this.setState({info: productinfo});
                }
            });
    }

    render() {
        return (
            <div className="productbox">
                <div className="productinfo">
                    <h1 className="price">{this.state.product0price} €/kg</h1>
                    <h3 className="product title">{this.state.product0}</h3>
                    <p className="product owner">Esimerkin tila</p>
                    <p className="productAmount">Saatavilla yht. {this.state.product0amount} kg</p>
                    <p className="productExtraInfo">Lisätiedot: {this.state.product0info}</p>
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
            </div>
        );
    }
}

export default ProductPage;