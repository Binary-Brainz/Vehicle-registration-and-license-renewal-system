import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";

const RequestRejection = () => {
    const onSubmit = (data) => {
        console.log(data);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
                <Form.Label htmlFor="reason">Reason for rejection</Form.Label>
                <textarea
                    className="form-control"
                    id="reason"
                    rows="3"
                    name='reason'
                    placeholder='Brief description about reason for rejection'
                    {...register("reason", {
                        required: true
                    })}>
                </textarea>
            </Form.Group>
            {errors.reason && <p className='errorMsg'>Reason is required!</p>}
            <br></br>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default RequestRejection
