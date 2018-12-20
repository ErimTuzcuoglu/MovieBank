import React, { Component } from 'react';
import {
    Input, Button, InputGroup, InputGroupAddon, Row, Col, Container, CardImg, Label
} from 'reactstrap';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/Footer';

export default class TwoFAAuthPage extends Component {

    constructor(props) {
        super(props);
        this.state = { code: null, qrCodeImg: null };
        this.twoFactor = this.twoFactor.bind(this);
        this.verify = this.verify.bind(this); 
        this.handleKeyPress = this.handleKeyPress.bind(this);
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');
        this.twoFactor(userId);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.verify();
        }
    }

    twoFactor(id) {
        if (id) {
            var secret = speakeasy.generateSecret({ length: 20 });
            console.log(secret.base32); // Save this value to your DB for the user
            localStorage.setItem("secret", secret.base32);
            // Example:  JFBVG4R7ORKHEZCFHZFW26L5F55SSP2Y

            QRCode.toDataURL(secret.otpauth_url)
            .then(image_data => {
                this.setState({ qrCodeImg: image_data })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }


    verify(){
        // This is provided the by the user via form POST
        var userToken = this.state.code//params.get('token');

        // Load the secret.base32 from their user record in database
        var secret = localStorage.getItem("secret");
        // const secretAscii = base32.decode(secret);
        // const secretHex = toHex(secretAscii);

        // Verify that the user token matches what it should at this moment
        var verified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: userToken
        });

        console.log(verified)
    }

    render() {
        document.title = "Verify Your Account - MovieBank";
        return (
            <div>
                <NavigationBar />

                <Container fluid style={{ margin: '5%', width: '90%' }}>
                    <Row>
                        <Col sm={12} lg={6} style={styles.bodyStyle}>
                            <div style={styles.qrStyle}><Label>2 Factor Authentication</Label><br />
                            {this.state.qrCodeImg ? <CardImg top width="100%" style={{ height: 250, width: 250, margin:'auto' }} src={this.state.qrCodeImg} alt="Photo" /> : ""}
                            </div>
                            <InputGroup size="sm" style={{ marginTop: 10 }}>
                                <InputGroupAddon addonType="prepend" >Enter verification code here: </InputGroupAddon>
                                <Input placeholder="code" value={this.state.code} onKeyPress={this.handleKeyPress} onChange={(e) => this.setState({ code: e.target.value })} />
                            </InputGroup>
                            <Button size="md" color="success" style={styles.style} onClick={this.verify}>Send</Button>
                        </Col>
                    </Row>
                </Container>
                <Footer />
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
        width: '100%',
        borderRadius: 5,
        padding: '2%',
        backgroundColor: '#eeeeee'
    },
    qrStyle: { 
        width: '100%', 
        margin: 'auto', 
        paddingBottom: 10, 
        textAlign: 'center', 
        display: 'inline - block' 
    }
}