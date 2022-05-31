import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { vehRegDateResed } from '../statusSlice';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';

async function reserveDate(data) {

    const token = sessionStorage.getItem('token');

    return fetch('http://localhost:5000/owner/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
}

const DateReservationComponent = () => {

    const dispatch = useDispatch();
    const id = useSelector(state => state.user.id);
    const toast = useRef(null);
    const [date, setDate] = useState(null);

    const onSubmit = async (date) => {

        console.log(date);

        let body_data = {};
        body_data['date'] = date;
        body_data['id'] = id;
        
        let response = await reserveDate(body_data);
        if(response.status === "ok"){
            dispatch(vehRegDateResed());
        }else{
            toast.current.show({severity:'info', summary: `${response.error}`, detail: "Try another day!", life: 5000});
        }
        
    }

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const disableFutureDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 3).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className=''>
            <Toast ref={toast} />
            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
            <br/><br/><Button variant="primary" onClick={()=>onSubmit(date)}>Reserve Selected Date</Button>
        </div>

    )
}

export default DateReservationComponent
