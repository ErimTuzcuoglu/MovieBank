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
import StarRatings from 'react-star-ratings';
import $ from 'jquery';

export default class FilmListesi extends Component {


    mapTheCards(cards) {
        return (
            cards.map((card) =>
                <Col sm={4} md={3} lg={3} xl={2} xxl={1} className="mb-0" style={{ marginRight: 40 }}>
                    <Card style={styles.cardStyle}>
                        <Link to={{ pathname: "/details", state: { id: card.id, poster_link: this.props.poster_link } }}>
                            <CardImg width={'100%'} src={this.props.poster_link + card.backdrop_path} />
                        </Link>
                        <CardBlock style={{ border: '1px solid #d6d7da' }}>
                            <Link to={{ pathname: "/details", state: { card: card, poster_link: this.props.poster_link } }}>
                                <CardTitle style={styles.titleStyle}><b>{card.title}</b></CardTitle>
                            </Link>
                            <CardText style={styles.overviewStyle}>{card.overview.length > 100 ? card.overview.substring(0, 99) + "..." : card.overview}</CardText>
                        </CardBlock>
                        <CardSubtitle style={styles.subtitleStyle}>
                            <div style={styles.bottomStyle}>
                            <StarRatings
                                starDimension={'20px'}
                                starSpacing={'0px'}
                                rating={(card.vote_average / 2)}
                                starRatedColor="#5ba0ad"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                            /><Badge color="info" pill style={{marginLeft: 50}}>{card.vote_average}</Badge>
                            </div>
                        </CardSubtitle>
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
        minWidth: 230,
        minHeight: 380,
        width: '100%',
        border: '1px solid #d6d7da',
    },
    titleStyle: {
        color: '#000000',
        fontSize: 18,
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