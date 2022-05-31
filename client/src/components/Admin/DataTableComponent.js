
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

const DataTable = (props) => {

    const user_id = useSelector(state => state.user.id);

    const [products, setProducts] = useState(null);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [name, setname] = useState('');
    const [requests, setRequests] = useState([]);

    const productService = new ProductService();
    useEffect(() => {

        // console.log(productService.getProductsWithOrdersSmall());
        // productService.getProductsWithOrdersSmall().then(data => setProducts(data));

        async function fetchData() {

            try {
            
                const token = sessionStorage.getItem('token');
    
                let response = await axios.get(`http://localhost:5000/officer/dashboard/${user_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                        state: props.state 
                    }
                });
    
                let status = response.data.status;
                let returned_requests = response.data.requests;

                if(status === 'ok'){
                    setRequests(returned_requests);
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


    const renderListItem = (request) => {
        return (
            <div className="col-12 shadow">
                <div className="product-list-item">
                    <div className="product-list-detail">
                        <div className="product-name">{request.ownerName}</div>
                        <div className="product-description">{request.regNo}</div>

                    </div>
                    <div className="product-list-action">
                        <Button label="Show" icon="pi pi-external-link" onClick={() => onClick('displayResponsive', request.ownerName)} className="p-button-info p-button-sm p-button-rounded" />
                        <div className="product-badge">{request.createdAt}</div>
                    </div>
                </div>

            </div>

        );
    }


    const itemTemplate = (request) => {
        if (!request) {
            return;
        }
        return renderListItem(request);

    }

    return (

        <div className="dataview-demo">
            <div className="card">
                <DataView value={requests} itemTemplate={itemTemplate} paginator rows={5} />
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

export default DataTable;