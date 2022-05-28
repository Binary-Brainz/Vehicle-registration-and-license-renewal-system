import React, {Component} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'; 
import VehicleOwnerMain from './components/VehicleOwnerMainComponent';
import LoginSignup from './components/LoginSignupMainComponent';


class App extends Component {

    render(){
      return (   
        
          <BrowserRouter>
            <div className='App'>
              <VehicleOwnerMain />
            </div>
          </BrowserRouter>
          
      );
    }
  }
  
  export default App;