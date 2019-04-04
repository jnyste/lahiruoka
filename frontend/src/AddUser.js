import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import './css/AddUser_style.css';

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postNewUser = this.postNewUser.bind(this);

        this.state = {
            name: ''
            , usertype: ''
            , username: ''
            , password: ''
            , address: ''
            , phone: ''
            , info: ''
        };
    }
    componentDidMount() {
        if (this.props.match.params.id === 'uusi') {
            this.setState({modifying: false})
        } else {
            fetch('/api/users/' + this.props.match.params.id)
                .then((httpResponse) => httpResponse.json())
                .then((user) => {

                    this.setState({
                        name: user.companyName
                        , usertype: user.userType
                        , username: user.username
                        , password: user.password
                        , address: user.address
                        , phone: user.phone
                        , info: user.info
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

    handleSubmit(event) {
        const name = this.state.name;
        const usertype = this.state.usertype;
        const username = this.state.username;
        const password = this.state.password;
        const address = this.state.address;
        const phone = this.state.phone;
        const info = this.state.info;

        /*
        if (availableFrom > availableTo) {
            alert('Tarkista "Saatavilla"-päivämäärät!');
        } else {
            if (name.length <= 0 || price.length <= 0 || amount.length <= 0 || availableFrom.length <= 0 || availableTo.length <= 0) {
                alert('Täytä kaikki tähdellä merkityt kentät!');
            } else {
                this.postNewProduct();
            }
        }
        */

        event.preventDefault();
    }

    async postNewUser() {

        const newUser = {
            name: this.state.name
            , usertype: this.state.usertype
            , username: this.state.username
            , password: this.state.password
            , address: this.state.address
            , phone: this.state.phone
            , info: this.state.info
        };

        await fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(() => {
            console.log("Should be posted");
            this.props.history.push("/profiili/");
        })
    }

    render() {
        return (
            <div className="user-add-form">
                <h2>Lisää käyttäjä</h2>
                <p>Tähdellä merkityt kohdat ovat pakollisia.</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group required">
                        <label htmlFor="exampleUserCompanyName">Tilan / keittiön nimi:</label>
                        <input type="text" className="form-control" id="exampleUserCompanyName" value={this.state.name} onChange={this.handleChange}
                               placeholder="Anna tilan/keittiön nimi" name="name" />
                    </div>
                    <div className="form-group  required">
                        <label htmlFor="exampleUsername">Käyttäjänimi:</label>
                        <input type="text" className="form-control" id="exampleUsername" value={this.state.username} onChange={this.handleChange}
                               placeholder="Anna käyttäjänimi, esim. paraskeittio" name="username"/>
                    </div>
                    <div className="form-group  required">
                        <label htmlFor="examplePassword">Salasana:</label>
                        <input type="text" className="form-control" id="examplePassword" value={this.state.password} onChange={this.handleChange}
                               placeholder="Anna salainen sana" name="password"/>
                    </div>
                    <div className="form-group  required">
                        <label htmlFor="exampleAddress">Osoite:</label>
                        <input type="text" className="form-control" id="exampleAddress" value={this.state.address} onChange={this.handleChange}
                               placeholder="Anna osoite, esim Kukkakuja 6, 33330 Mikkeli" name="address"/>
                    </div>
                    <div className="form-group  required">
                        <label htmlFor="examplePhone">Puhelinnumero:</label>
                        <input type="text" className="form-control" id="examplePhone" value={this.state.address} onChange={this.handleChange}
                               placeholder="Anna puhelinnumero, esim. 050-5050505" name="phone"/>
                    </div>
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

export default withRouter(AddUser);