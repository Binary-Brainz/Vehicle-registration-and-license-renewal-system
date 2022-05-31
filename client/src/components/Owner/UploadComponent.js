import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';


const UploadComponent = (props) => {

    const id = useSelector(state => state.user.id);
    const fullName = useSelector(state => state.user.fullName);
    
    const onSubmit = async (data) => {

        console.log(data.file);
        const formData = new FormData();

        formData.append("type", props.type);
        formData.append("ownerID", id);
        formData.append("ownerName", fullName);
        //add regNo if type = update vehicle
        if(props.type === 'Update Vehicle'){
            formData.append('regNo', props.regNo);
        }

        for(let i =0; i < data.file.length; i++) {
                formData.append("documents", data.file[i]);
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
