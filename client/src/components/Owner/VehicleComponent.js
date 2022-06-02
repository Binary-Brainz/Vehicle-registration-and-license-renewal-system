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

    const getDateString = () => {
        const dd = String(vehicle.registeredDate.getDate()).padStart(2, "0");
        const mm = String(vehicle.registeredDate.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = vehicle.registeredDate.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    return (
        <div>
            {/* <Form.Group>
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
            {errors.ownerName && errors.ownerName.type === "required" && <p className='text-danger'>Owner's name is required!</p>}
            {errors.ownerName && errors.ownerName.type === "pattern" && <p className='text-danger'>Please enter a valid name!</p>} */}

            {/* <Form.Group>
                <Form.Label htmlFor="ownerNIC">Owner NIC</Form.Label>
                <Form.Control
                    type="hidden"
                    id="ownerNIC"
                    name="ownerNIC"
                    defaultValue={vehicle.ownerNIC}
                    disabled={update ? update : disabled}
                    {...register("ownerNIC", {
                        required: true,
                        validate: value => (/^[VX0-9]{10}$/i.test(value)) || (/^[0-9]{12}$/i.test(value))
                    })}
                />
            </Form.Group>
            {errors.ownerNIC && errors.ownerNIC.type === "required" && <p className='text-danger'>Owner's NIC is required!</p>}
            {errors.ownerNIC && errors.ownerNIC.type === "validate" && <p className='text-danger'>Owner's NIC invalid!</p>} */}
            {!update && <div>
                <div className="row">
                    <div className="col-sm">
                        <div>

                        </div>
                        <Form.Group>
                            <Form.Label htmlFor="registerDate">Register Date</Form.Label>
                            <Form.Control
                                type="date"
                                id="registerDate"
                                name="registerDate"
                                max={disableFutureDate()}
                                defaultValue={vehicle? vehicle.registeredDate : ''}
                                disabled={disabled}
                                {...register("registeredDate", {
                                    required: true,
                                    validate: defaultValue => new Date(defaultValue) < new Date()
                                })}
                            />
                            {errors.registerDate && <p className='text-danger'>Valid Register Date is required!</p>}
                        </Form.Group>
                    </div>

                    <div className="col-sm">
                        <Form.Group>
                            <Form.Label htmlFor="manufacturedYear">Vehicle manufactured Year</Form.Label>
                            <Form.Control
                                type="text"
                                id="manufacturedYear"
                                name="manufacturedYear"
                                defaultValue={vehicle? vehicle.manufacturedYear : ''}
                                disabled={update ? update : disabled}
                                {...register("manufacturedYear", {
                                    required: true.valueOf,
                                    pattern: { value: /^[0-9 ]*$/ }
                                })}
                            />
                        </Form.Group>
                        {errors.manufacturedYear && <p className='text-danger'>Vehicle Manufactured Year is required!</p>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm">
                        <Form.Group>
                            <Form.Label>Vehicle Type</Form.Label>
                            <br></br>
                            <Form.Select name="type" defaultValue={vehicle? vehicle.type : ''} {...register("type", { validate: defaultValue => defaultValue !== 'default' })} disabled={update ? update : disabled}>
                                <option value={"default"} disabled={disabled} >Choose an Option</option>
                                <option value="1">Car</option>
                                <option value="2">Van</option>
                                <option value="3">Motor Bike</option>
                            </Form.Select>
                        </Form.Group>
                        {errors.type && <p className='text-danger'>Vehicle Type is required!</p>}

                    </div>
                    <div className="col-sm">
                        <Form.Group>
                            <Form.Label htmlFor="regNo">Vehicle Registration Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="regNo"
                                defaultValue={vehicle? vehicle.regNo : ''}
                                placeholder={vehicle.regNo}
                                {...register("regNo", {
                                    required: true
                                })}
                                disabled={update ? update : disabled}
                                onChange={(e) => { vehicle.regNo = e.target.value }}

                            />
                        </Form.Group>
                        {errors.regNo && <p className='text-danger'>Vehicle Registration Number is required!</p>}
                    </div>
                </div>
            </div>}

            <div className="row">
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="color">Vehicle Colour</Form.Label>
                        <Form.Control
                            type="color"
                            id="color"
                            name="color"
                            defaultValue={vehicle? vehicle.color : '#000000'}
                            disabled={disabled}
                            {...register("color", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.color && <p className='text-danger'>Vehicle Color is required!</p>}

                </div>
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="weight">Vehicle Weight</Form.Label>
                        <Form.Control
                            type="number"
                            id="weight"
                            name="weight"
                            defaultValue={vehicle? vehicle.weight : ''}
                            disabled={disabled}
                            {...register("weight", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.weight && <p className='text-danger'>Vehicle Weight is required!</p>}

                </div>
            </div>

            <div className="row">
                <div className="col-sm">
                    <Form.Group>
                        <Form.Label htmlFor="noOfDoors">Number of Doors</Form.Label>
                        <Form.Control
                            type="number"
                            id="noOfDoors"
                            name="noOfDoors"
                            defaultValue={vehicle? vehicle.noOfDoors : ''}
                            disabled={disabled}
                            {...register("noOfDoors", {
                                required: true
                            })}
                        />
                    </Form.Group>
                    {errors.noOfDoors && <p className='text-danger'>Number of door is required!</p>}
                </div>
                <div className="col-sm">
                    {!update && <Form.Group>
                        <Form.Label htmlFor="model">Vehicle Model</Form.Label>
                        <Form.Control
                            type="text"
                            id="model"
                            name="model"
                            defaultValue={vehicle? vehicle.model : ''}
                            disabled={update ? update : disabled}
                            {...register("model", {
                                required: true
                            })}
                        />
                        {errors.model && <p className='text-danger'>Vehicle Model is required!</p>}
                    </Form.Group>}

                </div>
            </div>

        </div>
    );

}

export default VehicleComponent
