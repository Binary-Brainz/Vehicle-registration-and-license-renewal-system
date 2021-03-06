import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import VehicleComponent from './VehicleComponent';
import { Collapse } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import UploadComponent from './UploadComponent';
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';
import ReserveDate from './ReserveDateComponent';

const ViewVehicleComponent = ({ vehicle }) => {

  const user_id = useSelector(state => state.user.id);

  const { register, formState: { errors } } = useForm();

  const [openReservation, setOpenReservation] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);


  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>View Vehicle Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="hidden"
              id="ownerID"
              name="ownerID"
              value={user_id}
            />
          </Form.Group>
          <VehicleComponent vehicle={vehicle} register={register} errors={errors} disabled={1} />
        </Form>

        <br></br>

        <Button
          onClick={() => setOpenReservation(!openReservation)}
          aria-expanded={openReservation}
        >
          Make Reservation to update details
        </Button>
        <Collapse in={openReservation}>
          <div >
            <Modal.Header>
              <Modal.Title>Reserve a Date</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <ReserveDate />
            </Modal.Body>

          </div>
        </Collapse>

        <br></br>
        <br></br>

        <Button
          onClick={() => setOpenUpload(!openUpload)}
          aria-expanded={openUpload}
        >
          Upload Form to Update Details
        </Button>
        <Collapse in={openUpload}>
          <div >
            <Modal.Header>
              <Modal.Title>Upload Documents</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <UploadComponent type={'Update Vehicle'} regNo={vehicle.regNo}/>
            </Modal.Body>

          </div>
        </Collapse>

      </Modal.Body>

      <Modal.Footer>

      </Modal.Footer>
    </div>
  )
}

export default ViewVehicleComponent
