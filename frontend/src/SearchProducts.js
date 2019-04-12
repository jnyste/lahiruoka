import React, {Component} from "react";
import './css/ProductPage_style.css';
import './css/SearchProducts_style.css';
import SingleProduct from './SingleProduct';

class SearchProducts extends Component {

    constructor(props) {
        super(props);
        console.log(props.match.params.keyWord);
        this.state = {productList: [], sort: 'newest'}
        this.listAllProducts = this.listAllProducts.bind(this);
        this.writeText = this.writeText.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        switch (this.state.sort) {
            case 'newest': fetch('/api/search/' + this.props.match.params.keyWord).then((httpResponse) => httpResponse.json()).then(this.listAllProducts);break;
            case 'priceAsc': fetch('/api/search/' + this.props.match.params.keyWord + '/sortByPriceAsc/true').then((httpResponse) => httpResponse.json()).then(this.listAllProducts);break;
            case 'priceDesc': fetch('/api/search/' + this.props.match.params.keyWord + '/sortByPriceAsc/false').then((httpResponse) => httpResponse.json()).then(this.listAllProducts);break;
            case 'availableAsc': fetch('/api/search/' + this.props.match.params.keyWord + '/sortByAvailableToAsc/true').then((httpResponse) => httpResponse.json()).then(this.listAllProducts);break;
            case 'availableDesc': fetch('/api/search/' + this.props.match.params.keyWord + '/sortByAvailableToAsc/false').then((httpResponse) => httpResponse.json()).then(this.listAllProducts);break;
            case 'nameAsc': fetch('/api/search/' + this.props.match.params.keyWord + '/sortByNameAsc/true').then((httpResponse) => httpResponse.json()).then(this.listAllProducts);break;
            case 'nameDesc': fetch('/api/search/' + this.props.match.params.keyWord + '/sortByNameAsc/false').then((httpResponse) => httpResponse.json()).then(this.listAllProducts);break;
        }
    }

    sort(event) {
        event.preventDefault();
        this.setState({sort: event.target.id}, this.componentDidMount)
    }

    writeText(sortedBy) {
        let searchResults = 'Osumia ' + this.state.productList.length + ' kpl';
        let placeHolder = [searchResults, <br/>]

        placeHolder.push(<a id="newest" href="http://" onClick={this.sort}>Viimeksi lisätyt</a>, ' | ');
        placeHolder.push(<a id="priceAsc" href="http://" onClick={this.sort}>Kilohinta nouseva</a>, ' | ');
        placeHolder.push(<a id="priceDesc" href="http://" onClick={this.sort}>Kilohinta laskeva</a>, ' | ');
        placeHolder.push(<a id="availableAsc" href="http://" onClick={this.sort}>Saatavilla nouseva</a>, ' | ');
        placeHolder.push(<a id="availableDesc" href="http://" onClick={this.sort}>Saatavilla laskeva</a>, ' | ');
        placeHolder.push(<a id="nameAsc" href="http://" onClick={this.sort}>A-Ö</a>, ' | ');
        placeHolder.push(<a id="nameDesc" href="http://" onClick={this.sort}>Ö-A</a>);

        switch (sortedBy) {
            case 'newest': placeHolder[2] = <b><a id="newest" href="http://" onClick={this.sort}>Viimeksi lisätyt</a></b>;break;
            case 'priceAsc': placeHolder[4] = <b><a id="priceAsc" href="http://" onClick={this.sort}>Kilohinta nouseva</a></b>;break;
            case 'priceDesc': placeHolder[6] = <b><a id="priceDesc" href="http://" onClick={this.sort}>Kilohinta laskeva</a></b>;break;
            case 'availableAsc': placeHolder[8] = <b><a id="availableAsc" href="http://" onClick={this.sort}>Saatavilla nouseva</a></b>;break;
            case 'availableDesc': placeHolder[10] = <b><a id="availableDesc" href="http://" onClick={this.sort}>Saatavilla laskeva</a></b>;break;
            case 'nameAsc': placeHolder[12] = <b><a id="nameAsc" href="http://" onClick={this.sort}>A-Ö</a></b>;break;
            case 'nameDesc': placeHolder[14] = <b><a id="nameDesc" href="http://" onClick={this.sort}>Ö-A</a></b>;break;
        }

        return placeHolder;
    }

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
                    {this.writeText(this.state.sort)}
                </div>
                {this.state.productList}
            </div>
        )
    }
}

export default SearchProducts;
