import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";

async function renewLicense(data) {

    const token = sessionStorage.getItem('token');

    return fetch('http://localhost:5000/officer/renewLicense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: token,
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

const LicenseRenewalOfficer = (props) => {

    const onSubmit = async (data) => {

        data.renewalDate = new Date(data.renewalDate);

        var year = data.renewalDate.getFullYear();
        var month = (data.renewalDate.getMonth() + 1);
        var day = data.renewalDate.getDate();
        var expireDate = new Date(year + 1, month, day);

        data['expireDate'] = expireDate;
        data['isExpired'] = false;
        data['requestID'] = props.reqId;


        let response = await renewLicense(data);
        if(response.status === "ok"){
            console.log(response)
        }
        else{
            console.log(response.error);
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const disableFutureDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {/* <Form.Group>
                <Form.Label htmlFor="ownerName">Owner Name</Form.Label>
                <Form.Control
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    {...register("ownerName", {
                        required: true,
                        pattern: { value: /^[a-zA-Z ]*$/ }
                    })}
                />
            </Form.Group>
            {errors.ownerName && errors.ownerName.type === "required" && <p className='text-danger'>Owner Name is required!</p>}
            {errors.ownerName && errors.ownerName.type === "pattern" && <p className='text-danger'>Please enter a valid name!</p>}


            <Form.Group>
                <Form.Label htmlFor="ownerNIC">Owner NIC</Form.Label>
                <Form.Control
                    type="ownerNIC"
                    id="ownerNIC"
                    name="ownerNIC"
                    {...register("ownerNIC", {
                        required: true,
                        minLength: 10,
                        maxLength: 12
                    })}
                />
            </Form.Group>
            {errors.ownerNIC && errors.ownerNIC.type === "required" && <p className='text-danger'>Owner's NIC is required!</p>}
            {errors.ownerNIC && errors.ownerNIC.type === "minLength" && <p className='text-danger'>Owner's NIC invalid!</p>}
            {errors.ownerNIC && errors.ownerNIC.type === "maxLength" && <p className='text-danger'>Owner's NIC invalid!</p>} */}
            
            <Form.Group>
                {/* <Form.Label htmlFor="regNo">Vehicle Registration Number</Form.Label> */}
                <Form.Control
                    type="hidden"
                    id="regNo"
                    name="regNo"
                    defaultValue={props.regNo}
                    placeholder={props.regNo}
                    {...register("regNo", {
                        required: true
                    })}
                />
            </Form.Group>
            {errors.regNo && <p className='text-danger'>Vehicle Registration Number is required!</p>}

            <div className="row">
                {/* <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="weight">Vehicle Weight</Form.Label>
                        <Form.Control
                            type="number"
                            id="weight"
                            defaultValue={props.vehicle.weight}
                            name="weight"
                            {...register("weight", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.weight && <p className='text-danger'>Vehicle Weight is required!</p>}
                </div> */}
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label>Renewal date</Form.Label>
                        <Form.Control type="date" name='renewalDate' max={disableFutureDate()}
                            {...register("renewalDate", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.renewalDate && <p className='text-danger'>Please enter a valid renewal date!</p>}
                    <p>Expiration Date will be set to 1 year ahead of License Renewal Date</p>
                </div>
               
            </div>

            <div className="row">
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="paidAmount">Amount Paid</Form.Label>
                        <Form.Control
                            type="number"
                            id="paidAmount"
                            name="paidAmount"
                            {...register("paidAmount", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.paidAmount && <p className='text-danger'>Amount Paid is required!</p>}
                </div>

                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="nextYearFee">Fee for next year</Form.Label>
                        <Form.Control
                            type="number"
                            id="nextYearFee"
                            name="nextYearFee"
                            {...register("nextYearFee", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.nextYearFee && <p className='text-danger'>Fee for next year is required!</p>}

                </div>
            </div>

            <div className="row">
                
                {/* <div className="col-sm">
                    <Form.Group>
                        <Form.Label>Expiration date</Form.Label>
                        <Form.Control type="date" name='expirationDate' value={} {...register("expirationDate", {
                            required: true
                        })}
                        />
                    </Form.Group>
                    {errors.expirationDate && <p className='text-danger'>Please enter a valid expiration date!</p>}
                </div> */}
            </div>
            <br></br>
            <Button variant="primary" type="submit">
                Renew License and send to customer
            </Button>
        </Form>

    )
}

export default LicenseRenewalOfficer
