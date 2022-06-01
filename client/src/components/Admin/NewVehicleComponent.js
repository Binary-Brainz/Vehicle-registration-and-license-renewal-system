import React, { useRef } from 'react'
import VehicleComponent from '../Owner/VehicleComponent';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Toast } from 'primereact/toast';

async function addVehicle(data) {

    const token = sessionStorage.getItem('token');

    return fetch('/officer/addVehicle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: token,
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

const NewVehicle = (props) => {

    const toast = useRef(null);

    const onSubmit = async (data) => {

        data['ownerID'] = props.ownerID;
        data['requestID'] = props.reqId;

        setVehicle(data);

        let response = await addVehicle(data);
        if (response.status === "ok") {
            console.log(response)
            toast.current.show({ severity: 'success', summary: "Vehicle Successfully Registered!", life: 5000 });
        }
        else {
            console.log(response.error);
            toast.current.show({ severity: 'error', summary: `${response.error}`, life: 5000 });
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [vehicle, setVehicle] = useState({});

    return (
        <div>
            <Toast ref={toast} position="top-center" />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <VehicleComponent vehicle register={register} errors={errors} disabled={0} />
                <br></br>
                <Button variant="primary" type="submit" value="submit">
                    Register Vehicle
                </Button>
            </Form>

        </div>
    );
}

export default NewVehicle
