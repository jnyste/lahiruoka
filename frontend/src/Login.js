import React, {Component} from "react";
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

class Login extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {loggedin: false};
    }

    logout() {
        console.log('Logged out');
        this.setState({loggedin: false});
    }

    render() {

        const responseGoogle = (response) => {
            this.setState({loggedin: true});
            console.log(response);
        }

        return (
            <div className="App">
                <h1>LOGIN WITH GööGLE</h1>

                <br />
                <br />

                {this.state.loggedin ? <GoogleLogout
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                >
                </GoogleLogout>
                     : <GoogleLogin
                        clientId="881986225908-hio6su37v6pit5c8s527krgho65evc5u.apps.googleusercontent.com"
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />}



            </div>
        );
    }
}

export default Login;