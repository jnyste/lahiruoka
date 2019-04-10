import React, {Component} from "react";
import './css/ProductPage_style.css';
import SingleProduct from './SingleProduct';

class SearchProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {productList: []}
        this.listAllProducts = this.listAllProducts.bind(this);
    }

    componentDidMount() {
        fetch('/api/products/').then((httpResponse) => httpResponse.json()).then(this.listAllProducts);
    }

    listAllProducts(jsonObject) {
        let helperArray = [];

        for (let obj of jsonObject) {
            helperArray.push(<SingleProduct key={obj.product_id} id={obj}/>);
        }

        this.setState({productList: helperArray});
    }

    render() {
        return (
            <div className="product-list-container">
                <h3 className="listTitle">Tuotteet</h3>
                {this.state.productList}
            </div>
        )
    }
}

export default SearchProducts;
