import React, {Component} from "react";
import './css/ProductPage_style.css';
import './css/SearchProducts_style.css';
import SingleProduct from './SingleProduct';

class SearchProducts extends Component {

    constructor(props) {
        super(props);
        console.log(props.match.params.keyWord);
        this.state = {productList: [], text: [], sort: 'newest'}
        this.listAllProducts = this.listAllProducts.bind(this);
        this.writeText = this.writeText.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        fetch('/api/search/' + this.props.match.params.keyWord).then((httpResponse) => httpResponse.json()).then(this.listAllProducts);
    }

    sort(event) {
        event.preventDefault();
        console.log(event.target.id);
    }

    writeText() {
        console.log(this.state.productList);
        let searchResults = 'Osumia ' + this.state.productList.length + ' kpl';
        let placeHolder = [searchResults, <br/>]
        placeHolder.push(<a id="newest" href="" onClick={this.sort}>Viimeksi lisätyt</a>, ' | ');
        placeHolder.push(<a id="priceAsc" href="" onClick={this.sort}>Kilohinta nouseva</a>, ' | ');
        placeHolder.push(<a id="priceDesc" href="" onClick={this.sort}>Kilohinta laskeva</a>, ' | ');
        placeHolder.push(<a id="availableAsc" href="" onClick={this.sort}>Saatavilla nouseva</a>, ' | ');
        placeHolder.push(<a id="availableDesc" href="" onClick={this.sort}>Saatavilla laskeva</a>, ' | ');
        placeHolder.push(<a id="nameAsc" href="" onClick={this.sort}>A-Ö</a>, ' | ');
        placeHolder.push(<a id="nameDesc" href="" onClick={this.sort}>Ö-A</a>);
        this.setState({text: placeHolder})
    }

    // <a id="klikattu" href="" onClick={this.sort}>Viimeksi lisätyt</a> | Kilohinta nouseva | Kilohinta laskeva | Saatavilla nouseva | Saatavilla laskeva | A-Ö | Ö-A

    listAllProducts(jsonObject) {
        let helperArray = [];

        for (let obj of jsonObject) {
            helperArray.push(<SingleProduct key={obj.product_id} id={obj}/>);
        }

        this.setState({productList: helperArray});
        this.writeText();
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
