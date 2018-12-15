import React, { Component } from 'react';
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Input,
    Button,
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';

export default class LoginDropdown extends Component {

    constructor(props) {
        super(props);
        this.state = { dropdownOpen: false, redirect: false };
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.login = this.login.bind(this);
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    login() {
        //Buraya if gelecek.Eğer kullanıcı doğru giriş yapmış ve Apiden 200 kodu gelmişse giriş yapacak.
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/verify-account',
                search: "?id=" + 123595//this.state.id, //Kullanıcının idsini göndereceğiz.
            }} />
        }
    }

    render() {

        return (
            <UncontrolledDropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle color="link" size="sm" style={styles.navbarTextStyle}>
                    Sign Up / Login
                </DropdownToggle>
                <DropdownMenu style={styles.dropdownStyle} right>
                    {/* <DropdownItem header>Login</DropdownItem>
                                                <DropdownItem divider /> */}
                    {/* <DropdownItem disabled></DropdownItem> */}
                    <Input size="sm" placeholder="Username" />
                    <Input size="sm" placeholder="Password" style={{ marginTop: 5 }} type="password" />
                    <Button size="sm" color="success" style={styles.style} onClick={() => this.setState({ redirect: true })}>Login</Button>
                    {this.login()}
                    <Link to={{
                        pathname: "/forgot-password",
                    }}>
                        <Button size="sm" color="secondary" style={styles.style}>I forgot my password</Button>
                    </Link>

                    <DropdownItem divider />

                    <FacebookButton />
                    <div style={styles.style} />
                    <GoogleButton />

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
        marginTop: 7,
    },
    dropdownStyle: {
        padding: 20,
        minWidth: 260,
        backgroundColor: '#f7f7f7',
    },
    navbarTextStyle: {
        fontSize: 13,
        border: 0,
        margin: 5,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: 20,
        marginTop: -4,
        color: '#ffffff',
    },
}