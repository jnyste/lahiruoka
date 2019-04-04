import React, {Component} from "react";
import './css/UserProfile_style.css';
import pic from './farmer.jpg';
import {Link} from "react-router-dom";


class UserProfile extends Component {

    state = {productNames: ["Tähän tulee tuotteita"]};

    componentDidMount() {
        fetch('/api/users')
            .then(response => response.json())
            .then(user => {
                let farm = user[0];
                let farmUsername = farm.companyName;
                let farmAddress = farm.address;
                let farmPhone = farm.phone;
                let farmInfo = farm.info;
                this.setState({farm: farmUsername});
                this.setState({address: farmAddress});
                this.setState({phone: farmPhone});
                this.setState({info: farmInfo});
            });
        fetch('/api/products/1')
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
