import React, { Component } from "react";
import Footer from "./Owner/FooterComponent";
import MobileNav from "./Owner/HeaderComponent";



class VehicleOwnerMain extends Component {
    render() {
        return (
            <div>
                <MobileNav />
                <Footer />
            </div>
        );
    }
}

export default VehicleOwnerMain;