import React, { Component } from 'react';
import NavigationBar from '../component/NavigationBar';
import {
    Col, Row,
    Container, Card,
    CardImg,
    CardBlock,
    CardTitle,
    CardText,
    Button,
    Badge
} from 'reactstrap';
import Reflux from 'reflux';
import Footer from '../component/Footer';

import { Youtube_Link } from '../../controller/utils/Api';
import { FilmDetailsStore } from '../../controller/stores/FilmDetailsStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { actions } from '../../actions';
import { Poster_Link } from '../../controller/utils/Api';
import '../css/DetailsPage.css';
import NowPlaying from '../component/NowPlaying';
import StarRating from '../component/StarRating';

export default class FilmDetails extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = { rating: "0" };
        this.giveRate = this.giveRate.bind(this);
        actions.getFilmDetails(this.props.location.search.split(":")[1]);
        //Eğer "Link" vasıtasıyla "state" gönderildiyse: this.props.location.state.id
        actions.getVideos(this.props.location.search.split(":")[1]);
        this.stores = [FilmDetailsStore, BoxOfficeStore];
    }

    getCommadString(myString) {
        let newString = "";
        for (let i = 0; i < myString.length; i++) {
            if (i == myString.length - 1) {
                newString += myString[i].name;
            } else {
                newString += myString[i].name + ", ";
            }
        }
        return newString;
    }

    giveRate(newRating) {
        this.setState({
            rating: newRating
        });
    }

    renderContent() {
        const film_details = this.state.film_details;
        const videos = this.state.videos;
        var official_trailer = Youtube_Link;
        // console.log(this.state.videos);

        for (let i = 0; i < videos.length; i++) {
            if (videos[i].name.includes("Official Trailer")) {
                official_trailer += videos[i].key;
                // console.log(official_trailer);
                break;
            }
        }

        let rendereds;
        rendereds = (
            <Card className="cardStyle">
                <div className="embed-container"><iframe src={official_trailer} width="100%" height="100%" type="text/html" frameBorder="0" allowfullscreen></iframe></div>


                <CardTitle className="titleStyle"><b>{film_details.title}</b></CardTitle>
                <hr />
                <CardBlock /*style={{ border: '1px solid #d6d7da'}}*/>
                    <div>
                        <div style={{ float: 'left', width: '25%', }}>
                            <CardImg className="imgStyle" width={'100%'} src={Poster_Link + film_details.poster_path} />
                            <div className="bottomStyle">
                                <StarRating sendRate={this.giveRate} />
                                <Badge color="info" pill style={{ float: 'right', marginTop: '10%' }}>{this.state.rating} / 10</Badge>
                            </div>
                        </div>
                        <div style={{ float: 'right', width: '70%', marginLeft: 10 }}>
                            <CardText><b>Production Companies: </b>{this.getCommadString(film_details.production_companies)}</CardText><hr />
                            <CardText><b>Production Countries: </b>{this.getCommadString(film_details.production_countries)}</CardText><hr />
                            <CardText><b>Spoken Languages: </b>{this.getCommadString(film_details.spoken_languages)}</CardText><hr />
                            <CardText><b>Genres: </b>{this.getCommadString(film_details.genres)}</CardText><hr />
                            <CardText><b>Homepage: </b><a href={film_details.homepage}>{film_details.homepage}</a></CardText><hr />
                        </div>
                    </div>
                </CardBlock>
                <CardBlock>
                    <div><CardText className="overviewStyle">{film_details.overview}</CardText></div>
                </CardBlock>
                <CardBlock>
                    <Button color="info">Yorum Sayfası</Button>

                </CardBlock>
                {/* <CardSubtitle className="subtitleStyle"></CardSubtitle> */}
            </Card>
        )

        return rendereds
    }

    render() {
        document.title = (this.state.film_details) ? this.state.film_details.title + " - MovieBank" : "MovieBank";
        return (
            <div>
                <div>
                    <NavigationBar />
                </div>
                <Container fluid style={{ /*margin: 'auto',*/ margin: '3%', width: '94%', }}>
                    <Row>
                        <Col sm={12} md={8} lg={9} style={{ marginBottom: '5%' }}>
                            {(this.state.film_details && this.state.videos) ? this.renderContent() : <div></div>}
                        </Col>
                        <Col>
                            {this.state.boxOffice ? <NowPlaying boxOfficeData={this.state.boxOffice} /> : <div></div>}
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}