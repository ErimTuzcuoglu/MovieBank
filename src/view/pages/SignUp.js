import React, { Component } from 'react';
import {
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/Footer';


export default class SignUp extends Component {

    constructor(props) {
        super(props);
        // this.state = { userInfo: null };
    }

    render() {
        document.title = "Signup - MovieBank";
        return (
            <div>
                <NavigationBar />
                <div style={styles.bodyStyle}>
                    <InputGroup size="sm">
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Username" />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Password"  type="password" />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Confirm Password"  type="password" />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Name"  />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Surname"  />
                    </InputGroup>
                    <InputGroup size="sm" style={{ marginTop: 10 }}>
                        <InputGroupAddon addonType="prepend">⚫</InputGroupAddon>
                        <Input placeholder="Email"  />
                    </InputGroup>
                    <Button size="sm" color="success" style={styles.style}>Sign Up</Button>
                </div>
                <Footer/>
            </div>
        );
    }
}

const styles = {
    style: {
        width: '100%',
        marginTop: 10,
    },
    bodyStyle: {
        margin: 'auto',
        width: '75%',
        borderRadius: 12,
        padding: '2%',
        marginTop: '10%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    }
}