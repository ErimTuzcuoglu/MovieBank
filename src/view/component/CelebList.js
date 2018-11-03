import React, { Component } from 'react';
import {
    Col, Card,
    CardImg,
    CardBlock,
    CardTitle,
    CardSubtitle,
    CardText,
    Badge
} from 'reactstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import UnknownProfile from '../image/unknown-profile.jpg';
import { Poster_Link } from './../../controller/utils/Api';
import $ from 'jquery';

export default class FilmListesi extends Component {


    mapTheCards(cards) {
        return (
            cards.map((card) =>
                <Col xs={12} sm={8} md={6} lg={3} xl={2} className="mb-0" style={{ marginRight: '8%' }}>
                    <Card style={styles.cardStyle}>
                        <Link to={{
                            pathname: "/celeb-detail",
                            search: "?id:" + card.id,
                            //state: { card: card, }
                        }}>
                            <CardImg style={{ width: '100%', minHeight: 300 }} src={(card.profile_path) ? (Poster_Link + card.profile_path) : UnknownProfile} />

                            <CardBlock style={{ border: '1px solid #d6d7da' }}>
                                <CardTitle style={styles.nameStyle}><b>{card.name}</b></CardTitle>
                            </CardBlock>
                            <CardSubtitle style={styles.subtitleStyle}>
                                <div style={styles.bottomStyle}>
                                    <CardText>Popularity <Badge color="info" pill style={{ marginLeft: 20 }}>{card.popularity}</Badge></CardText>

                                </div>
                            </CardSubtitle>
                        </Link>
                    </Card>
                </Col>
            )
        );
    }

    render() {
        const cards = this.props.list;

        return (
            <div style={styles.scrollingWrapper}>
                {this.mapTheCards(cards)}
            </div>
        );
    }
}

const styles = {
    cardStyle: {
        backgroundColor: '#ffffff',
        minWidth: 200,
        minHeight: 113,
        width: '100%',
        border: '1px solid #d6d7da',
    },
    nameStyle: {
        color: '#636363',
        fontWeight: 'bold',
        fontSize: 18,
        minHeight: 42,
    },
    overviewStyle: {
        color: '#898989',
        fontSize: 15,
    },
    subtitleStyle: {
        backgroundColor: '#efefef',
        minHeight: 50,
        border: '1px solid #d6d7da',
    },
    bottomStyle: {
        margin: 'auto',
        width: '90%',
        padding: 10,
    },
    scrollingWrapper: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        card: {
            flex: 0
        }
    }
};