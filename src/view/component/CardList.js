import React, { Component } from 'react';
import {
    Col, Card,
    CardImg,
    CardBlock,
    CardTitle,
    CardSubtitle,
    CardText,
    Badge,
} from 'reactstrap';
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import TinySlider from "tiny-slider-react";

import { Poster_Link } from './../../controller/utils/Api';
import nullMovie from '../image/nullMovie.png';
import $ from 'jquery';

export default class FilmListesi extends Component {

    mapTheCards(cards) {
        return (
            cards.slice(0, 10).map((card) =>
                <Col xs={12} sm={8} md={6} lg={3} xl={2} className="mb-0" style={{ marginRight: '0.3%' }}>
                    <Card style={styles.cardStyle}>
                        <Link to={{
                            pathname: "/film-detail",
                            search: ("?id:" + card.id), //"?film=" + card.title.replace(" ", "-")+ ""
                            //state: { id: card.id },
                        }}>
                            <CardImg width={'100%'} src={(card.backdrop_path) ? (Poster_Link + card.backdrop_path) : nullMovie} />
                        </Link>
                        <CardBlock style={{ border: '1px solid #d6d7da' }}>
                            <Link to={{
                                pathname: "/film-detail",
                                search: ("?id:" + card.id),
                                //state: { id: card.id }
                            }}>
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
                                /><Badge color="info" pill style={{ marginLeft: 50 }}>{card.vote_average}</Badge>
                            </div>
                        </CardSubtitle>
                    </Card>
                </Col>
            )
        );
    }
    onGoTo = dir => this.ts.slider.goTo(dir)

    render() {
        const cards = this.props.list;

        const settings = {
            lazyload: true,
            nav: false,
            mouseDrag: true,
            fixedWidth: 210,
            touch: true,
            controls: false,
            // autoplay: true, 
            // autoplayTimeout: 1000,
            speed: 1000,
            responsive: {
                320: {
                    items: 1,
                },
                576: {
                    items: 2
                },
                770: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }

            },
        };

        return (
            <div>
                <button type="button" onClick={() => this.onGoTo('prev')}>Previous</button>
                <button type="button" onClick={() => this.onGoTo('next')}>Next</button>

                <TinySlider settings={settings} ref={ts => this.ts = ts}>
                    {this.mapTheCards(cards)}
                </TinySlider>
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
        height: '100%',
        border: '1px solid #d6d7da',
    },
    titleStyle: {
        color: '#636363',
        fontWeight: 'bold',
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
};