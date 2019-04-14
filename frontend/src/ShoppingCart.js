import React, {Component} from "react";

class ShoppingCart extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log('mounted');
    }

    render() {
        return (
            <div className="shoppingcart">
                <h1>Ostoskori</h1>
            </div>
        )
    }
}

export default ShoppingCart;
