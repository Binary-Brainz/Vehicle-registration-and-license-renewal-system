import React, {Component} from 'react';
import Login from './components/LoginSignup/LoginComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom'; 


class App extends Component {

    render(){
      return (   
        
          <BrowserRouter>
            <div className='App'>
              <Login />
            </div>
          </BrowserRouter>
          
      );
    }
  }
  
  export default App;