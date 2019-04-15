import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import GoogleLogin, { GoogleLogout } from 'react-google-login';

class Login extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.firstTimeUser = this.firstTimeUser.bind(this);
        this.continuingUser = this.continuingUser.bind(this);
        var loggedin = false;
        if(localStorage.getItem('loggedin') === 'true') {
            loggedin = true;
        }
        this.state = {loggedin: loggedin
                    , firstTime: false};
    }

    logout() {
        console.log('Logged out');
        this.setState({loggedin: false});
        localStorage.setItem('loggedin', 'false');
        localStorage.setItem('googleId', 'none');
        localStorage.setItem('userId', 'none');
        localStorage.setItem('userType', 'none');
        this.props.history.push("/");
        alert("Kirjauduit onnistuneesti ulos palvelusta.");
    }

    firstTimeUser() {
        this.props.history.push("/profiili/oma/uusi");
    }

    continuingUser() {
        this.props.history.push("/profiili/oma");
    }

    render() {

        const responseGoogle = (response) => {
            console.log(response.profileObj);
            if (response.profileObj === undefined) {
                console.log('Login failed');
            } else {
                this.setState({loggedin: true});
                let googleeId = response.profileObj.googleId;
                localStorage.setItem('loggedin', 'true');
                localStorage.setItem('googleId', googleeId);
                fetch('/api/users/' + googleeId).then((httpResponse) => httpResponse.json()).then((user) => {
                    if(user === null) {
                        this.firstTimeUser();
                    } else {
                        this.continuingUser();
                    }
                });
            }
        };

        return (
            <div className="App">
                {this.state.loggedin ?
                    <GoogleLogout
                        buttonText="Logout"
                        onLogoutSuccess={this.logout}
                        clientId="881986225908-hio6su37v6pit5c8s527krgho65evc5u.apps.googleusercontent.com"
                    >
                    </GoogleLogout>
                     :
                    <GoogleLogin
                        clientId="881986225908-hio6su37v6pit5c8s527krgho65evc5u.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                }
            </div>
        );
    }
}

export default withRouter(Login);