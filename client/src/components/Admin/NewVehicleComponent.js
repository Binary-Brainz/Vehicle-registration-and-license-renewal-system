import React from 'react'
import VehicleComponent from '../Owner/VehicleComponent';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const NewVehicle = () => {
    const onSubmit = (data) => {
        console.log(data);
        alert(
            data
        );
        setVehicle(data);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [vehicle, setVehicle] = useState({});

    return (
        <div>
            
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <VehicleComponent vehicle register={register} errors={errors} disabled={0}/>
                    <br></br>
                    <Button variant="primary" type="submit" value="submit">
                    Register Vehicle
                </Button>
                </Form>
            
        </div>
    );
}

export default NewVehicle
