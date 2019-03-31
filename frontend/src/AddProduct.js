import React, {Component} from "react";
import './css/AddProduct_style.css';

class AddProduct extends Component {

    render() {
        return (
            <div className="product-add-form">
                <h2>Lisää tuote</h2>
                <p>Tähdellä merkityt kohdat ovat pakollisia.</p>
                <form>
                    <div className="form-group required">
                        <label htmlFor="exampleProductName">Tuotteen nimi</label>
                        <input type="text" className="form-control" id="exampleProductName"
                               placeholder="Anna tuotteen nimi"/>
                    </div>
                    <div className="form-group  required">
                        <label htmlFor="examplePrice">Veroton hinta per kg</label>
                        <input type="text" className="form-control" id="examplePrice" placeholder="Veroton hinta (kg)"/>
                        <small id="priceHelp" className="form-text text-muted">Hintaan lisätään 14% ALV oston yhteydessä.
                        </small>
                    </div>
                    <div className="form-group  required">
                        <label htmlFor="exampleAmount">Määrä kiloina</label>
                        <input type="text" className="form-control" id="exampleAmount" placeholder="Määrä(kg)"/>
                    </div>
                    <div className="required">
                        <label htmlFor="exampleAmount">Saatavilla:</label>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="date" className="form-control" />
                        </div>
                        <p>-</p>
                        <div className="col">
                            <input type="date" className="form-control" />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="exampleInfo">Lisätiedot</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Lisää</button>
                </form>
            </div>
        )
    }
}

export default AddProduct;
