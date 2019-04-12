import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import './css/AddProduct_style.css';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postNewProduct = this.postNewProduct.bind(this);

        this.state = {
            name: ''
            , price: ''
            , amount: ''
            , availableFrom: ''
            , availableTo: ''
            , info: ''
            , tags: ''
        };
    }
    componentDidMount() {
        if (this.props.match.params.id === 'uusi') {
            this.setState({modifying: false})
        } else {
            this.setState({modifying: true})
            fetch('/api/products/' + this.props.match.params.id)
                .then((httpResponse) => httpResponse.json())
                .then((product) => {

                    let tags = '';
                    for (let t of product.tags) {
                        tags += t.name;
                        tags += ',';
                    }
                    tags = tags.slice(0, -1);
                    this.setState({
                        name: product.name
                        , price: product.price
                        , amount: product.amount
                        , availableFrom: product.availableFrom
                        , availableTo: product.availableTo
                        , info: product.info
                        , tags: tags
                        , modifying: true
                    });
                });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    cancelModify = (event) => {
        console.log('peruutettiin muokkaus');
        this.props.history.push("/profiili/oma");
        event.preventDefault();
    }

    deleteProduct = (event) => {
        if (window.confirm("Haluatko varmasti poistaa tuotteen?")) {
            fetch('/api/products/' + this.props.match.params.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => this.props.history.push("/profiili/oma"));
        }
        event.preventDefault();
    }

    handleSubmit(event) {
        const name = this.state.name;
        const price = this.state.price;
        const amount = this.state.amount;
        const availableFrom = this.state.availableFrom;
        const availableTo = this.state.availableTo;

        if (availableFrom > availableTo) {
            alert('Tarkista "Saatavilla"-päivämäärät!');
        } else {
            if (name.length <= 0 || price.length <= 0 || amount.length <= 0 || availableFrom.length <= 0 || availableTo.length <= 0) {
                alert('Täytä kaikki tähdellä merkityt kentät!');
            } else {
                this.postNewProduct();
            }
        }

        event.preventDefault();
    }

    async postNewProduct() {

        let tagArray = this.state.tags.split(',');

        for (let i in tagArray) {
            let tag = tagArray[i];
            tagArray[i] = tag.trim();
        }

        let filtered = tagArray.filter(function (el) {
            return el !== '';
        });

        tagArray = filtered;

        if(this.state.modifying) {
            const modifiedProduct = {
                name: this.state.name
                , price: this.state.price
                , amount: this.state.amount
                , availableFrom: this.state.availableFrom
                , availableTo: this.state.availableTo
                , info: this.state.info
                , tags: tagArray
            };
            await fetch('/api/products/' + this.props.match.params.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(modifiedProduct)
            }).finally(() => this.props.history.push("/profiili/oma"))
        } else {
            const newProduct = {
                name: this.state.name
                , price: this.state.price
                , amount: this.state.amount
                , availableFrom: this.state.availableFrom
                , availableTo: this.state.availableTo
                , info: this.state.info
            };
            await fetch('/api/products/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            }).then((response) => {
                return response.json();
            }).then((value) => {
                  console.log('VALUE??',value);

                  fetch('/api/products/' + value + '/farm', {
                      method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(localStorage.getItem('farmId')),
                  }).then(() => {
                      console.log("tags added to " + value);
                  });

                if (tagArray.length > 0) {
                    fetch('/api/products/' + value + '/tag', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(tagArray),
                    }).then(() => {
                            console.log("farm added to " + value);
                        }
                    )
                }
            }).finally(() => this.props.history.push("/profiili/oma"))
        }
    }

    render() {

        return (
            <div className="product-add-form">
                <h2>Lisää tuote</h2>
                <p>Tähdellä merkityt kohdat ovat pakollisia.</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group required">
                        <label htmlFor="exampleProductName">Tuotteen nimi:</label>
                        <input type="text" className="form-control" id="exampleProductName" value={this.state.name} onChange={this.handleChange}
                               name="name" placeholder="Anna tuotteen nimi"/>
                    </div>
                    <div className="form-group  required">
                        <label htmlFor="examplePrice">Veroton hinta per kg:</label>
                        <input type="number" className="form-control" id="examplePrice" value={this.state.price} onChange={this.handleChange} placeholder="Veroton hinta (€/kg)" name="price"/>
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
                    <div className="form-group">
                        <label htmlFor="exampleTags">Avainsanat:</label>
                        <input type="text" className="form-control" id="exampleTags" value={this.state.tags} onChange={this.handleChange}
                               name="tags" placeholder="Esimerkiksi peruna, harjattu"/>
                        <small>Erottele avainsanat pilkulla.</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Lisää</button>
                    <button onClick={this.cancelModify} className="btn btn-primary cancelButton">Peruuta</button>
                    <button onClick={this.deleteProduct} className="btn btn-primary deleteButton">Poista</button>
                </form>
            </div>
        )
    }
}

export default withRouter(AddProduct);
