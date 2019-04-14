import React, {Component} from "react";
import Collapsible from 'react-collapsible';
import {Link} from "react-router-dom";

class SingleProduct extends Component {

    constructor(properties) {
        super(properties);

        this.updateListener = this.updateListener.bind(this);
        this.addListener = this.addListener.bind(this);
        this.writeDate = this.writeDate.bind(this);
        this.addToCart = this.addToCart.bind(this);

        let productTags = '';

        for (let tag of this.props.id.tags) {
            productTags = productTags + " #" + tag.name;
        }

        this.state = {amount: 0
                    , tags: productTags
                    , total: 0
                    , totalTax: 0};
    }

    writeDate(dateString) {
        let date = '';
        let dateSplitted = dateString.split('-');

        if (dateSplitted[1].substring(0,1) === '0') {
            dateSplitted[1] = dateSplitted[1].substring(1,2);
        }

        if (dateSplitted[2].substring(0,1) === '0') {
            dateSplitted[2] = dateSplitted[2].substring(1,2);
        }

        date = dateSplitted[2] + '.' + dateSplitted[1] + '.' + dateSplitted[0];

        return date;
    }

    updateListener(event) {
        let amount = Number(event.target.value);
        this.setState({amount: amount}, () => this.addListener(event));
    }

    addListener(event) {
        let result = this.props.id.price * this.state.amount;
        result = parseFloat(Math.round(result * 1000) / 1000);
        let taxResult = parseFloat(Math.round(result * 1.14 * 1000) / 1000);
        this.setState({total:result});
        this.setState({totalTax:taxResult});

        event.persist();
      }

      addToCart(event) {
        if(localStorage.getItem('deliveryDate') === '' || localStorage.getItem('deliveryDate') === null) {
            alert('Anna toimituspäivä ylämenusta!');
        } else if (this.state.amount <= 0) {
            alert('Anna tilausmäärä!');
        } else {
            const newOrder = {
                productId: this.props.id.productId
                , amount: this.state.amount
                , dateOfDelivery: localStorage.getItem('deliveryDate')
            };
            fetch('/api/users/' + localStorage.getItem('userId') + '/orders', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder)
            }).then(() => {
                console.log("Order posted?");
                this.setState({amount: 0
                    , total: 0
                    , totalTax: 0});
            });
            event.persist();
        }
      }

    render() {
        if (new Date(this.props.id.availableTo) < Date.now()) {
            return(null);
        }
        return (
            <div>
                <Collapsible trigger={this.props.id.name + ' - ' + this.props.id.farm.companyName + ' - ' + this.props.id.price + ' €/kg'} triggerClassName="producttitletrigger" triggerOpenedClassName="productopenedtrigger" >
                    <div className="productinfo">
                        <h1 className="price">{this.props.id.price} €/kg</h1>
                        <h3 className="product title">{this.props.id.name}</h3>
                        <p className="product owner">{this.props.id.farm.companyName}</p>
                        <p className="productAmount">Yhteensä {this.props.id.amount} kg</p>
                        <p className="productAmount">Saatavilla: {this.writeDate(this.props.id.availableFrom)} - {this.writeDate(this.props.id.availableTo)}</p>
                        <p className="productExtraInfo">Lisätiedot: {this.props.id.info}</p>
                        <p className="tags">{this.props.id.tags.map((tag) => <a href={"/tag/" + tag.name} key={tag.id}><span className={"productTag"}>#{tag.name}</span></a>)}</p>
                    </div>

                    {this.props.id.farm.googleId === localStorage.getItem('googleId') ?
                        <Link to={"/tuotelisays/" + this.props.id.productId} className="modifyLink">Muokkaa tietoja...</Link>
                        :
                        <div className="order">
                            <div className="floatTis">
                                <form>
                                    <input type="text" name="kg" className="kgBox" onChange={this.updateListener}/>
                                </form>
                            </div>
                            <div className="floatTis kgText">
                                <p>Kg</p>
                            </div>
                            <div className= "floatTis cart">
                                <button name="name" value="value" type="submit" onClick={this.addToCart}>Lisää ostoskoriin</button>
                            </div>
                            <div className="floatTis total">
                                <p>Veroton hinta: {this.state.total}€<br/>Verollinen hinta: {this.state.totalTax}€</p>
                            </div>
                        </div>
                    }
                </Collapsible>
            </div>
        );
    }
}

export default SingleProduct;
