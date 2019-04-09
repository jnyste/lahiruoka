import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

class Login extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        var loggedin = false;
        if(localStorage.getItem('loggedin') === 'true') {
            loggedin = true;
        }
        this.state = {loggedin: loggedin};
    }

    logout() {
        console.log('Logged out');
        this.setState({loggedin: false});
        localStorage.setItem('loggedin', 'false');
        localStorage.setItem('userId', 'none');
    }

    render() {

        const responseGoogle = (response) => {
            console.log(response.profileObj);
            if (response.profileObj === undefined) {
                console.log('Login failed');
            } else {
                this.setState({loggedin: true});
                let userId = response.profileObj.googleId;
                localStorage.setItem('loggedin', 'true');
                localStorage.setItem('userId', userId);
                console.log(response);
                this.props.history.push("/muokkaaprofiilia/uusi");
            }

        }

        return (
            <div className="App">
                <h1>LOGIN WITH GööGLE</h1>

                <br />
                <br />

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