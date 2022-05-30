import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";


const DateReservationComponent = () => {
    const onSubmit = (data) => {
        console.log(data);
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
