import React, { Component } from 'react';
import NavigationBar from './../component/NavigationBar';
import {
    Col, Card,
    CardImg,
    CardBlock,
    CardTitle,
    CardSubtitle,
    CardText,
    Badge
} from 'reactstrap';
import StarRatings from 'react-star-ratings';
import Reflux from 'reflux';
import { Fetch, Youtube_Link } from '../../controller/utils/Api';
import { FilmDetailsStore } from '../../controller/stores/FilmDetailsStore';
import { actions } from '../../actions';
import '../css/DetailsPage.css';

export default class details extends Reflux.Component {
    constructor(props) {
        super(props);
        actions.getFilmDetails(this.props.location.state.id);
        actions.getVideos(this.props.location.state.id);
        this.stores = [FilmDetailsStore];
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

    renderContent() {
        const { poster_link } = this.props.location.state
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
            <div style={{ margin: 'auto', marginTop: 20, width: '60%', minWidth: 300 }}>
                <Card className="cardStyle">
                    {/* <div>
                        <div style={{ float: 'left' }}></div>
                        <div style={{ float: 'right' }}></div>
                    </div> */}

                    <div className="embed-container"><iframe src={official_trailer} width="100%" height="100%" type="text/html" frameBorder="0" allowfullscreen></iframe></div>


                    <CardTitle className="titleStyle"><b>{film_details.title}</b></CardTitle>
                    <hr />
                    <CardBlock /*style={{ border: '1px solid #d6d7da'}}*/>
                        <div>
                            <div style={{ float: 'left', width: '20%', }}><CardImg className="imgStyle" width={'100%'} src={poster_link + film_details.poster_path} /></div>
                            <div style={{ float: 'right', width: '75%', marginLeft: 10 }}>
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
                    <CardSubtitle className="subtitleStyle">
                        <div className="bottomStyle">
                            <StarRatings
                                style={{float: 'left'}}
                                starDimension={'20px'}
                                starSpacing={'0px'}
                                rating={(film_details.vote_average)}
                                starRatedColor="#5ba0ad"
                                changeRating={this.changeRating}
                                numberOfStars={10}
                                name='rating'
                            /><Badge color="info" pill style={{ float:'right' }}>{film_details.vote_average}</Badge>
                        </div>
                    </CardSubtitle>
                </Card>
            </div>
        )

        return rendereds
    }

    render() {
        return (
            <div>
                <div>
                    <NavigationBar />
                </div>
                <div>
                    {(this.state.film_details && this.state.videos) ? this.renderContent() : <div></div>}
                </div>
            </div>
        );
    }
}