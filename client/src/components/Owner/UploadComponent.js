import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";


const UploadComponent = () => {
    const onSubmit = (data) => {
        console.log(data);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Document</Form.Label>
                <Form.Control type="file" name='file' {...register("file", {
                    required: true
                })} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Upload
            </Button>
        </Form>
    )
}

export default UploadComponent
