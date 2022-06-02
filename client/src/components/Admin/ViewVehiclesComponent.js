import React from 'react';

//##add token check to server request

const ViewVehicles = ( ) =>{

    const token = sessionStorage.getItem('token');

    if(!token){
        sessionStorage.clear();
        document.location = '/';
    }
   
}


export default ViewVehicles;