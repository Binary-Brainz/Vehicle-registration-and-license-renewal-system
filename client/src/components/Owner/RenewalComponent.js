import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';

const RenewalComponent = (props) => {

    const id = useSelector(state => state.user.id);
    const fullName = useSelector(state => state.user.fullName);

    const onSubmit = async (data) => {

        console.log(data.receipt[0]);
        console.log(data.ecoTest[0]);

        const formData = new FormData();

        formData.append("type", 'License Renewal');
        formData.append("ownerID", id);
        formData.append("ownerName", fullName);
        //add regNo
        formData.append('regNo', props.regNo);

        for(let i =0; i < data.receipt.length; i++) {
            formData.append("documents", data.receipt[i]);
        }
        for(let i =0; i < data.ecoTest.length; i++) {
            formData.append("documents", data.ecoTest[i]);
        }

        let response = await fetch("http://localhost:5000/owner/request", {
            method: 'POST',
            body: formData,
        })

        let returned_data = await response.json();
        console.log(returned_data);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h5>You have to pay Rs....</h5>
            <p>Please get an eco test report for your vehicle from a government approved place.
            Pay the above-mentioned fee to one of the following bank accounts get a payment receipt.</p>
            <p>Bank of Ceylon - 2298567</p>
            <p>People's Bank - 3986567</p>
            <p>Hatton National Bank - 498567</p>

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
