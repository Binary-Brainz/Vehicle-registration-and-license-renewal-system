
import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProductService } from '../service/ProductService';
import '../../styles/DataTable.css';
import { Badge, Card } from 'react-bootstrap';
import { InputTextarea } from 'primereact/inputtextarea';


const NotificationTable = (props) => {
    const [products, setProducts] = useState(null);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [name, setname] = useState('');

    const productService = new ProductService();
    useEffect(() => {
        console.log(productService.getProductsWithOrdersSmall());
        productService.getProductsWithOrdersSmall().then(data => setProducts(data));
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

        if (displayResponsive && name === data.name) {
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
                                        This is the notification 
                                        </Card>
                                        
                                    </Card.Text>
                                </div>

                                <div className='col-12 col-md-3 text-center align-self-center'>
                                    Attached File<br/>
                                    <Card.Link className='product-name' ><span className='fa fa-download'></span></Card.Link>
                                </div>
                            </div><br />
                        </div>
                    </Card>
                </div>
            );
        } else {
            return (
                <div onClick={() => onClick('displayResponsive', data.name)} className={`col-12 shadow noti`} style={{ border: "1px solid #bfd8ef", backgroundColor: `${(data.state === "new") ? "rgb(224 236 244)" : 'none'}` }}>
                    <div className="product-list-item">
                        <div className="product-list-detail">
                            <div className="product-badge">{data.name}</div>
                            <Badge pill bg="dark">Dark</Badge>

                        </div>
                        <div className="product-list-action">
                            <div className="product-badge">{data.description}</div>
                        </div>
                    </div>


                </div>
            );
        }




    }


    const itemTemplate = (product) => {
        if (!product) {
            return;
        }
        return renderListItem(product);

    }

    return (

        <div className="dataview-demo">
            <div className="">
                <DataView value={products} itemTemplate={itemTemplate} paginator rows={5} />
            </div>

        </div>
    );
}

export default NotificationTable;