import React, { Component } from "react";
import Header from "./Admin/HeaderComponent";
import Footer from "./Admin/FooterComponent";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";



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