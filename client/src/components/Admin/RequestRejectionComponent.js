import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { Toast } from 'primereact/toast';

async function rejectReqest(data) {

    const token = sessionStorage.getItem('officer_token');

    return fetch('http://localhost:5000/officer/reject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: token,
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

const RequestRejection = (props) => {

    const toast = useRef(null);

    const onSubmit = async (data) => {

        data['requestID'] = props.reqId;

        let response = await rejectReqest(data);

        if (response.status === 'ok') {
            // toast
            console.log(response);
            toast.current.show({ severity: 'success', summary: "Rejection notice successfully sent!", life: 5000 });
        }
        else {
            // toast error
            console.log(response);
            toast.current.show({ severity: 'info', summary: `${response.error}`, life: 5000 });
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div>
            <Toast ref={toast} position="top-center" />
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
                {errors.reason && <p className='text-danger'>Reason is required!</p>}
                <br></br>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default RequestRejection
