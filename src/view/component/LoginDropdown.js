import React, { Component } from 'react';
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Input,
    Button,
} from 'reactstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import FacebookButton from './FacebookButton';
import GoogleLogin from 'react-google-login';

export default class LoginDropdown extends Component {

    constructor(props) {
        super(props);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.state = { dropdownOpen: false };
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    responseGoogle(response) {
        console.log(response);
    }


    render() {
        const fbData = localStorage.getItem("loginData");
        return (
            <UncontrolledDropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} style={this.props.navbarTextStyle} style={{ marginTop: 5, }}>
                <DropdownToggle size="sm" style={{ backgroundColor: 'rgba(0, 0, 0, 0)', border: 0, }}>
                    Sign Up / Login
                </DropdownToggle>
                <DropdownMenu style={styles.dropdownStyle} right>
                    {/* <DropdownItem header>Login</DropdownItem>
                                                <DropdownItem divider /> */}
                    {/* <DropdownItem disabled></DropdownItem> */}
                    <Input size="sm" placeholder="Username" />
                    <Input size="sm" placeholder="Password" style={{ marginTop: 5 }} type="password" />
                    <Button size="sm" color="success" style={styles.style}>Login</Button>
                    <Button size="sm" color="secondary" style={styles.style}>I forgot my password</Button>
                    <DropdownItem divider />
                    {fbData ? "" : <FacebookButton logSelect={true} />}
                    <GoogleLogin
                        clientId="" //CLIENTID NOT CREATED YET
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    />
                    {/*  
                    <Button size="sm" color="danger" style={styles.style}>Login With Google</Button> */}
                    <DropdownItem divider />
                    <Link to={{
                        pathname: "/signup",
                    }}>
                        <Button size="sm" color="info" style={{ width: '100%', }}>Sign Up</Button>
                    </Link>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}

const styles = {
    style: {
        width: '100%',
        marginTop: 5,
    },
    dropdownStyle: {
        padding: 20,
        minWidth: 250,
        backgroundColor: '#f7f7f7',
    }
}