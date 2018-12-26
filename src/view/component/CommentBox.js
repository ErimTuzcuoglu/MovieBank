import React from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import StarRating from '../component/StarRating';
export default class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rating: "0" };
        this.giveRate = this.giveRate.bind(this);
    }

    giveRate(newRating) {
        this.setState({
            rating: newRating
        });
    }

    render() {
        return (
            <Form style={{ border: "2px solid #b0b0b0", padding: 20, backgroundColor: "#d0d0d0", borderRadius: 10, }}>
                <FormGroup row>
                    <Label for="title" sm={2}><b>Title:</b></Label>
                    <Col sm={10}>
                        <Input type="text" name="title" id="title" placeholder="Write a title for your review." />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Review" sm={2}><b>Review:</b></Label>
                    <Col sm={10}>
                        <Input type="textarea" name="Review" id="Review" placeholder="Write your review here." />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="rate" sm={2}><b>Rate:</b></Label>
                    <Col sm={10}>
                        <Row style={{ marginLeft: '2%'}}>
                            <StarRating name="rate" sendRate={this.giveRate} collapse={false} />
                            <Badge color="info" pill style={{ marginLeft: 30, paddingTop: 7}}>{this.state.rating} / 10</Badge>
                        </Row>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button>Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}