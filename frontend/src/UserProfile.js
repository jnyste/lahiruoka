import React, {Component} from "react";
import './css/UserProfile_style.css';
import pic from './farmer.jpg';
import {Link} from "react-router-dom";


class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.fetchProducts = this.fetchProducts.bind(this);
        console.log('User profile');
        this.state = {productNames: ["Tähän tulee tuotteita"]
                    , farm: ''
                    , address: ''
                    , phone: ''
                    , info: ''
                    , farmId: ''};

    }

    componentDidMount() {
        let paramsId = '' + this.props.match.params.id;
        if(paramsId === 'oma') {
            fetch('/api/users/' + localStorage.getItem('userId'))
                .then(response => response.json())
                .then(user => {
                    this.setState({ farm: user.companyName
                                    , address: user.address
                                    , phone: user.phone
                                    , info: user.info
                                    , farmId: user.id
                                  });
                    localStorage.setItem('farmId', user.id);
                }).then(() => this.fetchProducts());
        } else {
            fetch('/api/users/id/' + paramsId)
                .then(response => response.json())
                .then(user => {
                    this.setState({ farm: user.companyName
                        , address: user.address
                        , phone: user.phone
                        , info: user.info
                        , farmId: user.id
                    });
                }).then(() => this.fetchProducts());
        }
    }

    fetchProducts() {
        console.log(this.state);
        fetch('/api/farm/' + this.state.farmId + '/products')
            .then(response => response.json())
            .then(products => {
                let array = [];
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
                <div className="imagecontainer">
                    <img src={pic} alt="profile pic"></img>
                </div>
                <div className="userInfo">
                    <h5>{this.state.farm}</h5>
                    <p>{this.state.info}</p>
                    <p>{this.state.address}<br/>{this.state.phone}</p>
                </div>
                <div className="userproducts">
                    <h5>Tuotteet</h5>
                    {this.getProductList()}

                    <Link to="/tuotelisays/uusi">Lisää tuote....</Link>
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
                    return <a href=""><li key={ index }>{name}</li></a>;
                })}
            </ul>
        )
    }
}

export default UserProfile;
