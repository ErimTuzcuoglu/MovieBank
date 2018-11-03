import React from 'react';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
} from 'reactstrap';
import './../css/NavbarArama.css';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div style={{ width: '100%', minWidth:280 }}>
                <InputGroup size="sm" style={{ width: '100%', height:'40%' }}>
                    <Input placeholder="Find Movies"/>
                    <InputGroupAddon addonType="append"><Button className="button" color="info"></Button></InputGroupAddon>
                    
                </InputGroup>
            </div>
        );
    }
}
