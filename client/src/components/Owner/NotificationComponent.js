
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProductService } from '../service/ProductService';
import '../../styles/DataTable.css';
import { Badge, Card } from 'react-bootstrap';
import { InputTextarea } from 'primereact/inputtextarea';
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';

const axios = require('axios').default;



const NotificationTable = (props) => {

    let navigate = useNavigate();

    const storageUserData = JSON.parse(sessionStorage.getItem("userData"));
    const stored_id = useSelector(state => state.user.id);
    const user_id = (stored_id !== '')? stored_id : storageUserData.id;

    const [products, setProducts] = useState(null);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [name, setname] = useState('');
    const [notifications, setNotifications] = useState([]);

    const productService = new ProductService();
    useEffect(() => {

        // console.log(productService.getProductsWithOrdersSmall());
        // productService.getProductsWithOrdersSmall().then(data => setProducts(data));

        async function fetchData() {

            try {
            
                const token = sessionStorage.getItem('token');
    
                let response = await axios.get(`http://localhost:5000/owner/notifications/${user_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                        state: props.state 
                    }
                });
    
                let status = response.data.status;
                let returned_notifications = response.data.notifications;

                if(status === 'ok'){
                    setNotifications(returned_notifications);
                }
                else{
                    console.log(response.error);
                }
            } 
            catch (err) {
                console.log(err)
            }
        }

        fetchData();
    }, []);



    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive
    }
    const onClick = async (type, name) => {

        dialogFuncMap[`${type}`](true);
        setname(name);
    }

    const onHide = (name) => {

        dialogFuncMap[`${name}`](false);
    }


    const renderListItem = (notification) => {

        let file_url = "http://localhost:5000/owner/downloadFile/" + notification._id;

        if (displayResponsive && name === notification._id) {
            return (
                <div className={`col-12 shadow noti`} style={{ border: "1px solid #bfd8ef" }}>
                    <Card>
                        <div className='container'>
                            <div className='row text-end'>
                                <div className='col'>
                                    <Button onClick={() => onHide('displayResponsive')} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text p-button-sm" aria-label="Cancel" />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-12 col-md-9'>
                                    <Card.Text>
                                        <Card body>
                                        {notification.message}
                                        </Card>
                                        
                                    </Card.Text>
                                </div>
                                {(notification.state !== 'rejected')? 
                                <div className='col-12 col-md-3 text-center align-self-center'>
                                    Attached File<br/>
                                    <Card.Link href={file_url} className='product-name' ><span className='fa fa-download'></span></Card.Link>
                                </div> : ''}
                                
                            </div><br />
                        </div>
                    </Card>
                </div>
            );
        } else {
            return (
                <div onClick={() => onClick('displayResponsive', notification._id)} className={`col-12 shadow noti`} style={{ border: "1px solid #bfd8ef", backgroundColor: `${(!notification.isViewed) ? "rgb(224 236 244)" : 'none'}` }}>
                    <div className="product-list-item">
                        <div className="product-list-detail">
                            <div className="product-badge">{notification.type}</div>
                            <Badge pill bg="dark">{notification.regNo}</Badge>

                        </div>
                        <div className="product-list-action">
                            <div className="product-badge">{notification.createdAt}</div>
                        </div>
                    </div>


                </div>
            );
        }




    }


    const itemTemplate = (notification) => {
        if (!notification) {
            return;
        }
        return renderListItem(notification);

    }

    return (

        <div className="dataview-demo">
            <div className="">
                <DataView value={notifications} itemTemplate={itemTemplate} paginator rows={5} />
            </div>

        </div>
    );
}

export default NotificationTable;