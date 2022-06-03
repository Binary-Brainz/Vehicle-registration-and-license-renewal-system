import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleOwnerMain from './components/VehicleOwnerMainComponent';
// import AdminMainComponent from './components/AdminMainComponent';
import LoginSignup from './components/LoginSignupMainComponent';
import AdminMain from './components/AdminMainComponent';

import OwnVehicles from "./components/Owner/OwnVehiclesComponent";
import RegisterNewVehicle from "./components/Owner/RegisterNewVehicleComponent";
import RenewLicense from "./components/Owner/RenewLicenseComponent ";
import Requests from './components/Admin/RequestsComponent';
import ViewVehicles from './components/Admin/ViewVehiclesComponent';


class App extends Component {

    constructor(props) {
        super(props);

        this.setAuthState = this.setAuthState.bind(this);

        this.state = {
            authResponse: null,
        };
    }

    setAuthState = (response) => {
        this.setState({ authResponse: response });
    }

    render(){
      return (   
        
          <BrowserRouter>
            <div className='App'>


                <Routes>
                    <Route path="*" element={<LoginSignup setAuthState={(response) => this.setAuthState(response)}/>}></Route>
                    <Route path="/" element={<LoginSignup setAuthState={(response) => this.setAuthState(response)}/>}></Route>
                    <Route path="/ownerDashboard" element={<VehicleOwnerMain response={this.state.authResponse}/>}>
                        <Route path="" element={<OwnVehicles />}></Route>
                        <Route path="/ownvehicles" element={<OwnVehicles />}></Route>
                        <Route exact path="/registernewvehicle" element={<RegisterNewVehicle />} ></Route>  
                        <Route exact path="/renewlicense" element={<RenewLicense />} ></Route>
                    </Route> 
                    <Route path="/adminDashboard" element={<AdminMain response={this.state.authResponse}/>}>
                        <Route path="" element={<Requests />}></Route>
                        <Route exact path="/requests" element={<Requests />}></Route>
                        <Route exact path="/vehicledetails" element={<ViewVehicles />}></Route>    
                    </Route> 
                    {/* <Route exact path="officerDashboard" element={<AdminMainComponent response={this.state.authResponse}/>} ></Route> */}
                </Routes>

            </div>
          </BrowserRouter>
          
      );
    }
  }
  
  export default App;