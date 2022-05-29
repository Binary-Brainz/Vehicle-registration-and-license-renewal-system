import React, { Component } from "react";
import Header from "./Owner/HeaderComponent";
import Footer from "./Owner/FooterComponent";
import OwnVehicles from "./Owner/OwnVehiclesComponent";
import RegisterNewVehicle from "./Owner/RegisterNewVehicleComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RenewLicense from "./Owner/RenewLicenseComponent ";



class VehicleOwnerMain extends Component {
    render() {
        return (
            <div>
                <Header />
                
                    <Routes>
                        <Route path="*" element={<OwnVehicles />}></Route>
                        <Route path="/ownvehicles" element={<OwnVehicles />}></Route>
                        <Route exact path="/registernewvehicle" element={<RegisterNewVehicle />} ></Route>  
                        <Route exact path="/renewlicense" element={<RenewLicense />} ></Route>
                    </Routes>
                
                <Footer />
            </div>
        );
    }
}

export default VehicleOwnerMain;