import React, { Component } from "react";
import Header from "./Admin/HeaderComponent";
import Footer from "./Admin/FooterComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Requests from "./Admin/RequestsComponent";
import ViewVehicles from "./Admin/ViewVehicles";



class AdminMain extends Component {
    render() {
        return (
            <div>
                <Header />
                
                    <Routes>
                        <Route path="*" element={<Requests />}></Route>
                        <Route path="/requests" element={<Requests />}></Route>
                        <Route path="/vehicledetails" element={<ViewVehicles />}></Route>
                    </Routes>
                
                <Footer />
            </div>
        );
    }
}

export default AdminMain;