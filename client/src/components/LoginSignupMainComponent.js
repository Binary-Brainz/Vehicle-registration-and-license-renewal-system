import React, { Component } from "react";
import Footer from "./LoginSignup/FooterComponent";
import Header from "./LoginSignup/HeaderComponent";
import Home from "./LoginSignup/HomeComponent";


class LoginSignup extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Header setAuthState={(response) => this.props.setAuthState(response)}/>
                <Home />
                <Footer />
            </div>
        );
    }
}

export default LoginSignup;