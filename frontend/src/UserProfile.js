import React, {Component} from "react";
import './css/UserProfile_style.css';
import farmPic from './img/farm.jpg';
import kitchenPic from './img/kitchen.jpg';
import {Link} from "react-router-dom";
import SingleProduct from "./SingleProduct";
import ErrorPage from "./ErrorPage";

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.fetchProducts = this.fetchProducts.bind(this);
        this.state = {products: ["Tähän tulee tuotteita"]
                    , farm: ''
                    , address: ''
                    , phone: ''
                    , info: ''
                    , farmId: ''
                    , userType: ''
                    , googleId: ''
                    , wrongAddress: false};

    }

    componentDidMount() {
        let loggedin;
        if(localStorage.getItem('loggedin') === 'true'){
            loggedin = true;
        } else {
            loggedin = false;
        }
        let paramsId = '' + this.props.match.params.id;
        if(paramsId === 'oma' && loggedin) {
            fetch('/api/users/' + localStorage.getItem('googleId'))
                .then(response => response.json())
                .then((user) => {
                        if (user) {
                            this.setState({
                                farm: user.companyName
                                , address: user.address
                                , phone: user.phone
                                , info: user.info
                                , farmId: user.id
                                , userType: user.userType
                                , googleId: user.googleId
                            });
                            localStorage.setItem('userId', user.id);
                            localStorage.setItem('userType', user.userType);
                        } else {
                            this.setState({wrongAddress: true});
                        }
                }).then(() => {if (!this.state.wrongAddress) this.fetchProducts()});
        } else if (paramsId === 'oma' && !loggedin) {
            this.setState({wrongAddress: true});
        } else {
            fetch('/api/users/id/' + paramsId)
                .then(response => response.json())
                .then(user => {
                    if (user) {
                        this.setState({ farm: user.companyName
                            , address: user.address
                            , phone: user.phone
                            , info: user.info
                            , farmId: user.id
                            , userType: user.userType
                            , googleId: user.googleId
                        });
                    } else {
                        this.setState({wrongAddress: true});
                    }
                }).then(() => {if (!this.state.wrongAddress) this.fetchProducts()});
        }
    }

    fetchProducts() {
        fetch('/api/farm/' + this.state.farmId + '/products')
            .then(response => response.json())
            .then(products => {
                let helperArray = [];
                for (let product of products) {
                    helperArray.push(<SingleProduct key={product.productId} id={product}/>);
                }
                this.setState({products: helperArray});

            });
    }

    render() {
        return (
            <div className="profilecontainer">
            {this.state.wrongAddress ?
                <ErrorPage/>
                :
                <div>
                    <div className="imagecontainer">
                        <img src={this.state.userType === 'KITCHEN' ? kitchenPic : farmPic} alt="profile pic"></img>
                    </div>
                    <div className="userInfo">
                        <h5>{this.state.farm}</h5>
                        <p>{this.state.info}</p>
                        <p>{this.state.address}<br/>{this.state.phone}</p>
                        {this.state.googleId === localStorage.getItem('googleId') &&
                        <Link to="/profiili/oma/muokkaa">Muokkaa tietoja...</Link>}
                    </div>
                    {this.state.userType === 'FARM' &&
                        <div className="userproducts">
                            <h5>Tuotteet</h5>
                            {this.state.products}
                            {this.state.googleId === localStorage.getItem('googleId') &&
                            <Link to="/tuotelisays/uusi">Lisää tuote....</Link>}
                        </div>
                    }
                </div>
            }
            </div>
            )
    }
}

export default UserProfile;
