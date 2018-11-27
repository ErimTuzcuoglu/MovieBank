import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import StarRating from '../component/StarRating';
export default class CommentBox extends React.Component {
    render() {
        return (
            <Form style={{ border: "2px solid #b0b0b0", padding: 20, backgroundColor: "#d0d0d0", borderRadius:10, }}>
                <FormGroup row>
                    <Label for="title" sm={2}><b>Title:</b></Label>
                    <Col sm={10}>
                        <Input type="text" name="title" id="title" placeholder="Title" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="message" sm={2}><b>Message:</b></Label>
                    <Col sm={10}>
                        <Input type="textarea" name="message" id="message" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="rate" sm={2}><b>Rate:</b></Label>
                    <Col sm={10}>
                        <StarRating name="rate" sendRate={this.giveRate} background={false} />
                    </Col> 
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2}}>
                        <Button>Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}
