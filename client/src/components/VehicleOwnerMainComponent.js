import React, { Component } from "react";
import Header from "./Owner/HeaderComponent";
import Footer from "./Owner/FooterComponent";
import OwnVehicles from "./Owner/OwnVehicleComponent";
import RegisterNewVehicle from "./Owner/RegisterNewVehicleComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



class VehicleOwnerMain extends Component {
    render() {
        return (
            <div>
                <Header />
                
                    <Routes>
                        <Route path="*" element={<OwnVehicles />}></Route>
                        <Route exact path="/ownvehicles" element={<OwnVehicles />}></Route>
                        <Route exact path="/registernewvehicle" element={<RegisterNewVehicle />} ></Route>  
                        <Route exact path="/renewlicense" element={<RegisterNewVehicle />} ></Route>
                    </Routes>
                
                <Footer />
            </div>
        );
    }
}

export default VehicleOwnerMain;