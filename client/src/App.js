import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleOwnerMain from './components/VehicleOwnerMainComponent';
// import AdminMainComponent from './components/AdminMainComponent';
import LoginSignup from './components/LoginSignupMainComponent';


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
                    <Route exact path="/ownerDashboard" element={<VehicleOwnerMain response={this.state.authResponse}/>}></Route>  
                    {/* <Route exact path="/officerDashboard" element={<AdminMainComponent response={this.state.authResponse}/>} ></Route> */}
                </Routes>
            </div>
          </BrowserRouter>
          
      );
    }
  }
  
  export default App;