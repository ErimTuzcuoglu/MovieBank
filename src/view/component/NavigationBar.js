import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import NavbarArama from './NavbarSearch';
import logo from '../image/logo.png';
import LoginDropdown from './LoginDropdown';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.collapseToggleNavbar = this.collapseToggleNavbar.bind(this);
        this.state = { collapseNavbar: false, };
    }

    collapseToggleNavbar() {
        this.setState({
            collapseNavbar: !this.state.collapseNavbar
        });
    }

    render() {
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
                                <NavItem>
                                    <NavLink href="/components/" style={styles.navbarTextStyle}>Top 10</NavLink>
                                </NavItem>
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
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle style={styles.navbarTextStyle} /*nav*/ caret>Options</DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>Option 1</DropdownItem>
                                        <DropdownItem>Option 2</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Reset</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <Nav className="ml-auto">
                                    <NavItem>
                                        {/* <NavLink href="/components/" >Kaydol/Giriş Yap</NavLink> */}
                                        <LoginDropdown navbarTextStyle={styles.navbarTextStyle} />
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

export default NavigationBar;