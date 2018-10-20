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
            <div>
                <InputGroup style={{width:280}}>
                    <Input placeholder="Find Movies"/>
                    <InputGroupAddon addonType="append"><Button className="button" color="success"></Button></InputGroupAddon>
                    
                </InputGroup>
            </div>
        );
    }
}
