import React from 'react'
import Form from 'react-bootstrap/Form';

const VehicleComponent = ({ vehicle, register, errors, disabled, update }) => {
    const disableFutureDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    return (
        <div>
            <Form.Group>
                <Form.Label htmlFor="ownerName">Owner Name</Form.Label>
                <Form.Control
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    defaultValue={vehicle.ownerName}
                    disabled={update ? update : disabled}
                    {...register("ownerName", {
                        required: true,
                        pattern: { value: /^[a-zA-Z ]*$/ }
                    })}
                />
            </Form.Group>
            {errors.ownerName && errors.ownerName.type === "required" && <p className='errorMsg'>Owner's name is required!</p>}
            {errors.ownerName && errors.ownerName.type === "pattern" && <p className='errorMsg'>Please enter a valid name!</p>}

            <Form.Group>
                <Form.Label htmlFor="ownerNIC">Owner NIC</Form.Label>
                <Form.Control
                    type="ownerNIC"
                    id="ownerNIC"
                    name="ownerNIC"
                    defaultValue={vehicle.ownerNIC}
                    disabled={update ? update : disabled}
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
                        <Form.Label htmlFor="registerDate">Register Date</Form.Label>
                        <Form.Control
                            type="date"
                            id="registerDate"
                            name="registerDate"
                            max={disableFutureDate()}
                            defaultValue={vehicle.registerDate}
                            disabled={disabled}
                            {...register("registerDate", {
                                required: true,
                                validate: defaultValue => new Date(defaultValue) < new Date()
                            })}
                        />
                    </Form.Group>
                    {errors.registerDate && <p className='errorMsg'>Valid Register Date is required!</p>}
                </div>

                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="manufacturedYear">Vehicle manufactured Year</Form.Label>
                        <Form.Control
                            type="text"
                            id="manufacturedYear"
                            name="manufacturedYear"
                            defaultValue={vehicle.manufacturedYear}
                            disabled={update ? update : disabled}
                            {...register("manufacturedYear", {
                                required: true.valueOf,
                                pattern: { value: /^[0-9 ]*$/ }
                            })}
                        />
                    </Form.Group>
                    {errors.manufacturedYear && <p className='errorMsg'>Vehicle Model is required!</p>}
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label>Vehicle Type</Form.Label>
                        <br></br>
                        <Form.Select name="type" defaultValue={vehicle.type} {...register("type", { validate: defaultValue => defaultValue !== 'default' })} disabled={update ? update : disabled}>
                            <option value={"default"} disabled={disabled} >Choose an Option</option>
                            <option value="1">Car</option>
                            <option value="2">Van</option>
                            <option value="3">Motor Bike</option>
                        </Form.Select>
                    </Form.Group>
                    {errors.type && <p className='errorMsg'>Vehicle Type is required!</p>}

                </div>
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="regNo">Vehicle Registration Number</Form.Label>
                        <Form.Control
                            type="text"
                            id="regNo"
                            name="regNo"
                            defaultValue={vehicle.regNo}
                            disabled={update ? update : disabled}
                            {...register("regNo", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.regNo && <p className='errorMsg'>Vehicle Registration Number is required!</p>}
                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="color">Vehicle Colour</Form.Label>
                        <Form.Control
                            type="color"
                            id="color"
                            name="color"
                            defaultValue={vehicle.color}
                            disabled={disabled}
                            {...register("color", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.color && <p className='errorMsg'>Vehicle Color is required!</p>}

                </div>
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="weight">Vehicle Weight</Form.Label>
                        <Form.Control
                            type="number"
                            id="weight"
                            name="weight"
                            defaultValue={vehicle.weight}
                            disabled={disabled}
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
                        <Form.Label htmlFor="model">Vehicle Model</Form.Label>
                        <Form.Control
                            type="text"
                            id="model"
                            name="model"
                            defaultValue={vehicle.model}
                            disabled={update ? update : disabled}
                            {...register("model", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.model && <p className='errorMsg'>Vehicle Model is required!</p>}

                </div>

                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="doors">Number of Doors</Form.Label>
                        <Form.Control
                            type="number"
                            id="doors"
                            name="doors"
                            defaultValue={vehicle.doors}
                            disabled={disabled}
                            {...register("doors", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.doors && <p className='errorMsg'>Number of door is required!</p>}
                </div>
            </div>

        </div>
    );

}

export default VehicleComponent