import React, { Component } from "react";
import Footer from "./LoginSignup/FooterComponent";
import Header from "./LoginSignup/HeaderComponent";
import Home from "./LoginSignup/HomeComponent";


class LoginSignup extends Component {
    render() {
        return (
            <div>
                <Header />
                <Home />
                <Footer />
            </div>
        );
    }
}

export default LoginSignup;