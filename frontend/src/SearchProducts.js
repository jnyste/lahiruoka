import React, {Component} from "react";
import './css/ProductPage_style.css';
import './css/SearchProducts_style.css';
import SingleProduct from './SingleProduct';

class SearchProducts extends Component {

    constructor(props) {
        super(props);
        console.log(props.match.params.keyWord);
        this.state = {productList: [], text: 'Lataa...', sort: 'Newest'}
        this.listAllProducts = this.listAllProducts.bind(this);
        this.writeText = this.writeText.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        fetch('/api/search/' + this.props.match.params.keyWord).then((httpResponse) => httpResponse.json()).then(this.listAllProducts);
        this.writeText();
    }

    sort(event) {
        event.preventDefault();
        console.log(event.target.id);
    }

    writeText() {
        this.setState({text: <p><a id="klikattu" href="" onClick={this.sort}>Viimeksi lisätyt - Kilohinta nouseva - Kilohinta laskeva - Saatavilla nouseva - Saatavilla laskeva</a></p>})
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
                <div className="textContainer">
                    <h3 className="listTitle">Hakutulokset sanalle "{this.props.match.params.keyWord}"</h3>
                    {this.state.text}
                </div>
                {this.state.productList}
            </div>
        )
    }
}

export default SearchProducts;
