import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";

const RenewalComponent = () => {
    const onSubmit = (data) => {
        console.log(data);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h5>You have to pay Rs....</h5>
            <p>Please submit your payment receipt and EcoTest Report below</p>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Payment Receipt</Form.Label>
                <Form.Control type="file" name='file' {...register("receipt", {
                    required: true
                })} />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload EcoTest Report</Form.Label>
                <Form.Control type="file" name='file' {...register("ecoTest", {
                    required: true
                })} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default RenewalComponent
