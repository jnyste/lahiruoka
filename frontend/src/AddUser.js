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
            userType: '2'
            , companyName: ''
            , address: ''
            , phone: ''
            , info: ''
            , googleId : localStorage.getItem('userId')
        };
    }

    componentDidMount() {

        if (this.props.match.params.id === 'uusi') {
            this.setState({modifying: false})
        } else {
            fetch('/api/users/' + localStorage.getItem('userId'))
                .then((httpResponse) => httpResponse.json())
                .then((user) => {
                    console.log(user);
                    this.setState({
                        companyName: user.companyName
                        , userType: user.userType
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
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });

    }

    handleSubmit(event) {
        const userType = this.state.userType;
        const companyName = this.state.companyName;
        const address = this.state.address;
        const phone = this.state.phone;

        if (userType === '2' || companyName.length <= 0 || address.length <= 0 || phone.length <= 0) {
            alert('Täytä kaikki tähdellä merkityt kentät!');
        } else {
            this.postNewUser();
        }

        event.preventDefault();
    }

    async postNewUser() {

        let userType;

        if (this.state.userType === "0") {
            userType = 0;
        } else {
            userType = 1;
        }

        const newUser = {
            googleId: this.state.googleId
            , userType: userType
            , companyName: this.state.companyName
            , address: this.state.address
            , phone: this.state.phone
            , info: this.state.info
        };

        console.log(newUser);

        await fetch('/api/users', {
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
                <h2>Käyttäjätiedot</h2>
                <p>Tähdellä merkityt kohdat ovat pakollisia.</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group required">
                        <label htmlFor="exampleUserType">Käyttäjätyyppi:</label>
                        <br/>
                        <small>Lähiruokatuottaja voi lisätä tuotteita myyntiin, keittiö on ostajaosapuoli.</small>
                        <br/>
                        <input type="radio" name="userType" onChange={this.handleChange} value="1" checked={this.state.userType === '1'} /> Lähiruokatuottaja
                        <input type="radio" name="userType" onChange={this.handleChange} value="0" checked={this.state.userType === '0'}/> Keittiö<br/>
                    </div>
                    <div className="form-group required">
                        <label htmlFor="exampleUserCompanyName">Tilan / keittiön nimi:</label>
                        <input type="text" className="form-control" id="exampleUserCompanyName" value={this.state.companyName} onChange={this.handleChange}
                               placeholder="Anna tilan/keittiön nimi" name="companyName" />
                    </div>
                    <div className="form-group required">
                        <label htmlFor="exampleAddress">Osoite:</label>
                        <input type="text" className="form-control" id="exampleAddress" value={this.state.address} onChange={this.handleChange}
                               placeholder="Anna osoite, esim Kukkakuja 6, 33330 Mikkeli" name="address"/>
                    </div>
                    <div className="form-group required">
                        <label htmlFor="examplePhone">Puhelinnumero:</label>
                        <input type="text" className="form-control" id="examplePhone" value={this.state.phone} onChange={this.handleChange}
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