import React from 'react'
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import VehicleComponent from '../Owner/VehicleComponent';
import Form from 'react-bootstrap/Form';

const UpdateVehicle = () => {
  const onSubmit = (data) => {
    console.log(data);
    setVehicle(data);
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [vehicle, setVehicle] = useState(
    {
      ownerName: "Zafra",
      ownerNIC: "19997654321",
      registeredDate: "2022-01-31",
      type: "1",
      regNo: "CAZ-9876",
      model: "Toyota Axio",
      color: "#ffffff",
      weight: 4000,
      doors: 4
    }
  );

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
