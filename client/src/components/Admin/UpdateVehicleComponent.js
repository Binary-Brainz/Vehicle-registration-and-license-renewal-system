import React from 'react'
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import VehicleComponent from '../Owner/VehicleComponent';
import Form from 'react-bootstrap/Form';

async function updateVehicle(data) {

    const token = sessionStorage.getItem('officer_token');

    return fetch('/officer/updateVehicle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: token,
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

const UpdateVehicle = (props) => {

  const onSubmit = async (data) => {

    data['regNo'] = vehicle.regNo;
    data['requestID'] = props.reqId;
    
    setVehicle(data);

    let response = await updateVehicle(data);
    if(response.status === "ok"){
        console.log(response)
    }
    else{
        console.log(response.error);
    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [vehicle, setVehicle] = useState(props.vehicle);

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <VehicleComponent vehicle={vehicle} register={register} errors={errors} disabled={0} update={1} />
        <br></br>
        <Button variant="primary" type="submit" value="submit">
          Update Vehicle Details
        </Button>
      </Form>

    </div>
  )
}

export default UpdateVehicle
