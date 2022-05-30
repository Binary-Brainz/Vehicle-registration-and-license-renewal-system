import React, { Component } from "react";
import Header from "./Owner/HeaderComponent";
import Footer from "./Owner/FooterComponent";
import {Outlet} from "react-router-dom";



function VehicleOwnerMain() {
    
    return (
        <div>
            <Header />

                <Outlet />
            
            <Footer />
        </div>
    );
}

export default VehicleOwnerMain;