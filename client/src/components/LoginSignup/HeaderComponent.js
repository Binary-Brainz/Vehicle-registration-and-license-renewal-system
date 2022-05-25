import React, { Component } from "react";
import {
    Nav, Navbar, NavbarBrand, NavItem,
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input
} from 'reactstrap';
import Image from "react-bootstrap/Image";

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);


        this.state = {
            isNavOpen: false,
        };
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    handleLogin(event) {
        this.toggleModal();
        alert(
            "Username: " +
            this.username.value +
            " Password: " +
            this.password.value
        );
        event.preventDefault();
    }
    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="headr">
                        <div className="row d-flex align-items-center">
                            <div className="col-2 col-sm-1 float-left">
                                <NavbarBrand>
                                    <Image
                                        roundedCircle
                                        fluid
                                        src="assets/images/logo1.png"
                                        alt="logo.jpg"
                                    />
                                </NavbarBrand>
                            </div>
                            <div className="col-9">
                                <h1 className="header1">Vehicle Registration System</h1>
                            </div>
                            <div className="col">
                                <Nav className="ml-auto justify-content-end" navbar>
                                    <NavItem>
                                        <Button outline className="btnn" onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                        </Button>
                                    </NavItem>
                                </Nav>
                            </div>
                        </div>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    innerRef={(input) => (this.username = input)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    innerRef={(input) => (this.password = input)}
                                />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">
                                Login
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>



        );
    }

}

export default Header;