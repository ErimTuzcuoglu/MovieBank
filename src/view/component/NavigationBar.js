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
    DropdownItem
} from 'reactstrap';
import NavbarArama from './NavbarSearch';



class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.collapseToggleNavbar = this.collapseToggleNavbar.bind(this);
        this.state = { collapseNavbar: false };
    }


    collapseToggleNavbar() {
        this.setState({
            collapseNavbar: !this.state.collapseNavbar
        });
    }

    render() {
        return (
            <div>
                <Navbar color="secondary" dark expand="md">
                    <NavbarBrand href="/" style={{marginRight:40, marginLeft:50}}><b>Movie Bank</b></NavbarBrand>
                    <NavbarToggler onClick={this.collapseToggleNavbar} />
                    <Collapse isOpen={this.state.collapseNavbar} navbar left>
                        <Nav className="mr-auto" navbar>  {/*sağa almak için ml-auto*/}
                            <NavItem>
                                <NavLink href="/components/" style={styles.navbarTextColor}>Top 10</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap" style={styles.navbarTextColor}>GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle style={styles.navbarTextColor} nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <Nav className="mx-auto" navbar>
                                <NavbarArama />
                            </Nav>
                        </Nav>

                        
                    </Collapse>
                </Navbar>
            </div>

        );
    }
}

const styles ={
    navbarTextColor: {
        color: 'white'
    }
}

export default NavigationBar;