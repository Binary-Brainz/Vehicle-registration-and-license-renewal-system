import React, { Component } from "react";
import Header from "./Admin/HeaderComponent";
import Footer from "./Admin/FooterComponent";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Requests from "./Admin/RequestsComponent";
import ViewVehicles from "./Admin/ViewVehicles";



class AdminMain extends Component {
    render() {
        return (
            <div>
                <Header />
                
                <Outlet />
                
                <Footer />
            </div>
        );
    }
}

export default AdminMain;