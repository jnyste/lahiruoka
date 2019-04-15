import React, {Component} from "react";

class SingleOrder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Tilattu tuote: {this.props.order.product.name}</h3>
            </div>
        );
    }
}

export default SingleOrder;
