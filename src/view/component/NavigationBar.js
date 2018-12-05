import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import NavbarArama from './NavbarSearch';
import logo from '../image/logo.png';
import LoginDropdown from './LoginDropdown';
import logout from '../image/logout.png';

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.collapseToggleNavbar = this.collapseToggleNavbar.bind(this);
        this.loginRender = this.loginRender.bind(this);
        this.state = { collapseNavbar: false, };
    }

    collapseToggleNavbar() {
        this.setState({
            collapseNavbar: !this.state.collapseNavbar
        });
    }

    loginRender(loginData) {
        return (
            <div style={{ padding: 8 }}>
                <Link to={{ pathname: "/popular-celebs", /*state: { id: card.id }*/ }} style={styles.linkStyle}>
                    Welcome  {loginData.username} 
                </Link>&emsp;
                <Button color="link" style={styles.logoutButtonStyle} size="sm" onClick={() => {
                    localStorage.clear();
                    window.location.reload(false);
                }}></Button>
            </div>
        )
    }

    render() {
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        //console.log(loginData)

        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/" style={{ marginRight: 10, marginLeft: '3%', width: '10%' }}>
                        <img src={logo} height="70" width="70"></img>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.collapseToggleNavbar} style={{ width: '20%' }} />
                    <Collapse isOpen={this.state.collapseNavbar} navbar left style={{ width: '60%', marginTop: 5 }}>
                        <div style={{ width: '95%' }}>
                            <NavbarArama />
                            <Nav className="mr-auto" style={{ height: '50%', width: '100%', marginTop: 5 }} navbar>  {/*sağa almak için ml-auto*/}
                                <NavItem style={styles.navbarTextStyle}>
                                    <Link to={{ pathname: "/trends", /*state: { id: card.id }*/ }} style={styles.linkStyle}>
                                        Weekly Trends
                                    </Link>
                                </NavItem>
                                <NavItem style={styles.navbarTextStyle}>
                                    <Link to={{ pathname: "/upcoming", /*state: { id: card.id }*/ }} style={styles.linkStyle}>
                                        Upcoming
                                    </Link>
                                </NavItem>
                                <NavItem style={styles.navbarTextStyle}>
                                    <Link to={{ pathname: "/popular-celebs", /*state: { id: card.id }*/ }} style={styles.linkStyle}>
                                        Popular Celebs
                                    </Link>
                                </NavItem>
                                <Nav className="ml-auto">
                                    <NavItem>

                                        {loginData ?
                                            this.loginRender(loginData)
                                            :
                                            <LoginDropdown navbarTextStyle={styles.navbarTextStyle} />}
                                    </NavItem>
                                </Nav>
                            </Nav>
                        </div>
                    </Collapse>
                </Navbar>
            </div>

        );
    }
}

const styles = {
    logoutButtonStyle: {
        backgroundImage: "url(" + logout + ")",
        backgroundSize: 20,
        height: 25,
        width: 25,
        backgroundRepeat: 'no-repeat'
    },
    navbarTextStyle: {
        fontSize: 15,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 0,
        padding: 8,
    },
    linkStyle: {
        color: '#ffffff',
    },

}