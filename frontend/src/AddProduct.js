import React, {Component} from "react";
import './css/AddProduct_style.css';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            name: ''
            , price: ''
            , amount: ''
            , availableFrom: ''
            , availableTo: ''
            , info: ''
        };
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    render() {
        return (
            <div className="product-add-form">
                <h2>Lisää tuote</h2>
                <p>Tähdellä merkityt kohdat ovat pakollisia.</p>
                <form>
                    <div className="form-group required">
                        <label htmlFor="exampleProductName">Tuotteen nimi:</label>
                        <input type="text" className="form-control" id="exampleProductName" value={this.state.name} onChange={this.handleChange}
                               name="name" placeholder="Anna tuotteen nimi"/>
                    </div>
                    <div className="form-group  required">
                        <label htmlFor="examplePrice">Veroton hinta per kg:</label>
                        <input type="number" className="form-control" id="examplePrice" value={this.state.price} onChange={this.handleChange} placeholder="Veroton hinta (kg)" name="price"/>
                        <small id="priceHelp" className="form-text text-muted">Hintaan lisätään 14% ALV oston yhteydessä.
                        </small>
                    </div>
                    <div className="form-group  required">
                        <label htmlFor="exampleAmount">Määrä kiloina:</label>
                        <input type="number" className="form-control" id="exampleAmount" value={this.state.amount} onChange={this.handleChange} placeholder="Määrä(kg)" name="amount"/>
                    </div>
                    <div className="required">
                        <label>Saatavilla:</label>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="date" className="form-control" name="availableFrom" value={this.state.availableFrom} onChange={this.handleChange} />
                        </div>
                        <p>-</p>
                        <div className="col">
                            <input type="date" className="form-control" name="availableTo" value={this.state.availableTo} onChange={this.handleChange}  />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="exampleInfo">Lisätiedot:</label>
                        <textarea className="form-control" id="exampleInfo" value={this.state.info} onChange={this.handleChange} name="info" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Lisää</button>
                </form>
            </div>
        )
    }
}

export default AddProduct;
