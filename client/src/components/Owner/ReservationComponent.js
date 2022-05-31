import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';

async function reserveDate(data) {

    const token = sessionStorage.getItem('token');

    return fetch('https://vrse17-backend.herokuapp.com/owner/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
}

const DateReservationComponent = () => {

    const id = useSelector(state => state.user.id);

    const onSubmit = async (data) => {

        let body_data = {};
        body_data['date'] = data.reservation;
        body_data['id'] = id;

        let response = await reserveDate(body_data);
        console.log(response);
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

    )
}

export default DateReservationComponent
