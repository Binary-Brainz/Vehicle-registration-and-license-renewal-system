import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";

const LicenseRenewalOfficer = () => {
    const onSubmit = (data) => {
        console.log(data);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const disableFutureDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
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
            {errors.ownerName && errors.ownerName.type === "required" && <p className='errorMsg'>Owner Name is required!</p>}
            {errors.ownerName && errors.ownerName.type === "pattern" && <p className='errorMsg'>Please enter a valid name!</p>}


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
            {errors.ownerNIC && errors.ownerNIC.type === "required" && <p className='errorMsg'>Owner's NIC is required!</p>}
            {errors.ownerNIC && errors.ownerNIC.type === "minLength" && <p className='errorMsg'>Owner's NIC invalid!</p>}
            {errors.ownerNIC && errors.ownerNIC.type === "maxLength" && <p className='errorMsg'>Owner's NIC invalid!</p>}

            <div className="row">
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="regNo">Vehicle Registration Number</Form.Label>
                        <Form.Control
                            type="text"
                            id="regNo"
                            name="regNo"
                            {...register("regNo", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.regNo && <p className='errorMsg'>Vehicle Registration Number is required!</p>}
                </div>

                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="weight">Vehicle Weight</Form.Label>
                        <Form.Control
                            type="number"
                            id="weight"
                            name="weight"
                            {...register("weight", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.weight && <p className='errorMsg'>Vehicle Weight is required!</p>}

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
                    {errors.paidAmount && <p className='errorMsg'>Amount Paid is required!</p>}
                </div>

                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="nextFee">Fee for next year</Form.Label>
                        <Form.Control
                            type="number"
                            id="nextFee"
                            name="nextFee"
                            {...register("nextFee", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.nextFee && <p className='errorMsg'>Fee for next year is required!</p>}

                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label>Renewal date</Form.Label>
                        <Form.Control type="date" name='renewalDate' max={disableFutureDate()} {...register("renewalDate", {
                            required: true
                        })}
                        />
                    </Form.Group>
                    {errors.renewalDate && <p className='errorMsg'>Please enter a valid renewal date!</p>}
                </div>

                <div className="col-sm">
                    <Form.Group>
                        <Form.Label>Expiration date</Form.Label>
                        <Form.Control type="date" name='expirationDate' max={disableFutureDate()} {...register("expirationDate", {
                            required: true
                        })}
                        />
                    </Form.Group>
                    {errors.expirationDate && <p className='errorMsg'>Please enter a valid expiration date!</p>}
                </div>
            </div>
            <br></br>
            <Button variant="primary" type="submit">
                Renew License and send to customer
            </Button>
        </Form>

    )
}

export default LicenseRenewalOfficer