import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { vehRegDateResed } from '../statusSlice';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { useHref, useNavigate } from 'react-router-dom';

async function reserveDate(data) {

    const token = sessionStorage.getItem('owner_token');

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

    return (
        <div className=''>
            <Toast ref={toast} />
            <Calendar value={date} onChange={(e) => setDate(e.value)} inline showWeek />
            <br/><br/><Button label="Reserve Selected Date" onClick={()=>onSubmit(date)} className="p-button-rounded p-button-primary" />
        </div>

    )
}

export default DateReservationComponent
