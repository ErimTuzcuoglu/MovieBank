import React from 'react';
import {
    Container, Row, Col, CardImg, CardTitle,
} from 'reactstrap';
import CommentBox from '../component/CommentBox';
import NavigationBar from '../component/NavigationBar';
import Footer from '../component/Footer';
import Reflux from 'reflux';
import { FilmDetailsStore } from '../../controller/stores/FilmDetailsStore';
import { Poster_Link } from '../../controller/utils/Api';
import { actions } from '../../actions';


export default class CommentPage extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
        actions.getFilmDetails(this.props.location.search.split(":")[1]);

        this.stores = [FilmDetailsStore];
    }

    comments() {
        let allComments = []
        for (let i = 0; i < 5; i++) {
            allComments.push(
                <Container fluid style={{ marginTop: '2%', border: "1px solid #d6d7da", backgroundColor: "#ffffff", borderRadius: 10, padding:20 }}>
                    <h5><p><b>İsim,</b>  Tarih,   5 üzerinden badge veya yıldız göstergeç</p></h5>
                    <p className="lead">Title</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                </Container>
            )
        }
        return allComments;
    }

    rendereds() {
        const film_details = this.state.film_details;
        document.title = this.state.film_details.title + " - Comments";

        return (
            <Row>
                <Col sm={12} md={12} lg={12} style={styles.columnStyle}>
                    <CardTitle className="titleStyle"><b>{film_details.title}</b></CardTitle>
                    <Row style={{ marginBottom: 20 }}>
                        <Col sm="2" style={{marginBottom: 20}}>
                            <CardImg className="imgStyle" src={Poster_Link + film_details.poster_path} />
                        </Col>
                        <Col sm="10">
                            <CommentBox style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    {this.comments()}
                </Col>

            </Row>)
    }

    render() {

        return (
            <div>
                <NavigationBar />
                <Container fluid style={{ /*margin: 'auto',*/ margin: '3%', width: '94%', }}>
                    {this.state.film_details ? this.rendereds() : ""}

                </Container>
                <Footer />
            </div>

        );
    }
}


const styles = {
    columnStyle: {
        marginBottom: '5%',
        border: "2px solid #d6d7da",
        padding: '3%',
        paddingTop: 0,
        backgroundColor: "#f0f0f0",
        borderRadius: 5
    }
}