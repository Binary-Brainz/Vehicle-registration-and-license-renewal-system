
import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProductService } from '../service/ProductService';
import '../../styles/DataTable.css';
import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { gotId, gotNic } from '../userSlice';

const axios = require('axios').default;

const NotificationTable = (props) => {

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
                    console.log(returned_notifications);
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
    const onClick = (type, name) => {
        dialogFuncMap[`${type}`](true);
        setname(name);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }


    const renderListItem = (data) => {
        return (
            <div className=' '>
            <div className={`col-12 shadow`} style={{backgroundColor: `${(props.state === "new")? "#bfd8ef": 'none'}`}}>
                <div className="product-list-item">
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>

                    </div>
                    <div className="product-list-action">
                        <Button label="Show" icon="pi pi-external-link" onClick={() => onClick('displayResponsive', data.name)} className="p-button-info p-button-sm p-button-rounded" />
                        <div className="product-badge">{data.description}</div>
                    </div>
                </div>
                </div>

            </div>

        );
    }


    const itemTemplate = (product) => {
        if (!product) {
            return;
        }
        return renderListItem(product);

    }

    return (

        <div className="dataview-demo">
            <div className="card">
                <DataView value={products} itemTemplate={itemTemplate} paginator rows={5} />
            </div>
            <Dialog header={name} visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} >
                <Card>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                    </Card.Body>
                </Card>
            </Dialog>
        </div>
    );
}

export default NotificationTable;