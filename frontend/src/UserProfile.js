import React, {Component} from "react";
import './css/UserProfile_style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class UserProfile extends Component {

    state = {};

    componentDidMount() {

    }

    render() {
        return (
            <div className="profilecontainer">
                <h1>Farmarin profiili</h1>
                <p>Joku osoite tähän, Tampere 22304<br/> Puhelinnumero on 20002222</p>
                <p>Kuvaus teksti! Meillä on kyl paljon kaikkee, ihan et voi pojat sentään.</p>
            </div>
            )
    }
}

export default UserProfile;
