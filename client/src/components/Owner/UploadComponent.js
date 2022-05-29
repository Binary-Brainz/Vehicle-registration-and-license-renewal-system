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
        <>
            <Modal.Header closeButton>
                <Modal.Title>Upload Documents</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Document</Form.Label>
                        <Form.Control type="file" name='file' {...register("file",{
                      required:true})} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={handleSubmit(onSubmit)} variant="primary" type="submit">
                    Upload
                </Button>
            </Modal.Footer>
        </>
    )
}

export default UploadComponent
