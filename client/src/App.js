import React, {Component} from 'react';
import Login from './components/LoginSignupMainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom'; 
import VehicleOwnerMain from './components/VehicleOwnerMainComponent';


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