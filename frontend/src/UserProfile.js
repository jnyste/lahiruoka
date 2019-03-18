import React, {Component} from "react";
import './css/UserProfile_style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class UserProfile extends Component {

    state = {productNames: ["Tähän tulee tuotteita"]};

    componentDidMount() {
        fetch('/api/products/1')
            .then(response => response.json())
            .then(products => {
                var array = [];
                for (let i = 0; i < products.length; i++) {
                    let product = products[i];
                    let productName = product.name;
                    array.push(productName);
                }
                this.setState({productNames: array});

            });
    }

    getProductList() {
        let productnamesArray = this.state.productNames;

        return (
            <div>
            {<List name={productnamesArray}/>}
            </div>
        )
    }

    render() {
        return (
            <div className="profilecontainer">
                <div>
                    <h1>Farmarin profiili</h1>
                    <p>Joku osoite tähän, Tampere 22304<br/> Puhelinnumero on 20002222</p>
                    <p>Kuvaus teksti! Meillä on kyl paljon kaikkee, ihan et voi pojat sentään.</p>
                </div>
                <div className="userproducts">
                    <h3>Tuotteet</h3>
                    {this.getProductList()}
                </div>
            </div>
            )
    }
}

class List extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let productNames = [];
        let namesProps = this.props.name;

        for (let i = 0; i < namesProps.length; i++) {
            productNames.push(this.props.name[i]);
        }

        return (
            <ul>
                {productNames.map(function(name, index){
                    return <li key={ index }>{name}</li>;
                })}
            </ul>
        )
    }
}

export default UserProfile;
