import React, { useRef } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { vehRegDateResed } from '../statusSlice';

async function reserveDate(data) {

    const token = sessionStorage.getItem('owner_token');

    return fetch('/owner/reserve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: token,
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

const ReserveDate = () => {
    const toast = useRef(null);
    const dispatch = useDispatch();

    const storageUserData = JSON.parse(sessionStorage.getItem("userData"));
    const id = storageUserData.id;
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        let body_data = {};
        body_data['date'] = data.reservation;
        body_data['id'] = id;

        let response = await reserveDate(body_data);

        let status = response.status;
        if (status === 'ok') {
            //set store status
            dispatch(vehRegDateResed());
            //toast.current.show({ severity: 'success', summary: "Date Reservation Success!", life: 5000 });
            navigate("/ownerDashboard/ownvehicles");
        }
        else {
            console.log(response.error);
            toast.current.show({ severity: 'info', summary: `${response.error}`, detail: "Try another Date!", life: 5000 });
        }
    }

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const disableFutureDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 3).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div>
            <Toast ref={toast} position="top-center" />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Register a date</Form.Label>
                    <Form.Control type="date" name='reservation' min={disablePastDate()} max={disableFutureDate()} {...register("reservation", {
                        required: true
                    })}
                    />
                </Form.Group>
                {errors.date && <p className='errorMsg'>Please Reserve a valid Date!</p>}
                <br></br>
                <Button variant="primary" type="submit">
                    Reserve Date
                </Button>
            </Form>
        </div>

    )
}

export default ReserveDate
