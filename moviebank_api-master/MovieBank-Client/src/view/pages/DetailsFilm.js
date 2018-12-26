import React, { Component } from 'react';
import NavigationBar from '../component/NavigationBar';
import {
    Col, Row,
    Container, Card,
    CardImg,
    CardBlock,
    CardBody,
    CardSubtitle,
    CardTitle,
    CardText,
    Button,
    Badge
} from 'reactstrap';
import Reflux from 'reflux';
import Footer from '../component/Footer';
import { BrowserRouter as Router, Link } from "react-router-dom";

import { Youtube_Link } from '../../controller/utils/Api';
import { FilmDetailsStore } from '../../controller/stores/FilmDetailsStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import { actions } from '../../actions';
import { Poster_Link } from '../../controller/utils/Api';
import { addWatchedList, getWatchedList, deleteFromWatchedList, addWatchLaterList, getWatchLaterList, deleteFromWatchLaterList, sendRate, updateRate, getRate } from '../../controller/utils/UserApi';
import UnknownProfile from '../image/unknown-profile.jpg';
import '../css/DetailsPage.css';
import NowPlaying from '../component/NowPlaying';
import StarRating from '../component/StarRating';

export default class DetailsFilm extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = { rating: "0", showMoreBtnVisbltyCast: true, showMoreBtnVisbltyCrew: true, filmWatchlistApiId: null, filmWatchLaterApiId: null, watchedListButton: null, watchLaterListButton: null, rates: null };

        this.giveRate = this.giveRate.bind(this);
        this.addWatchList = this.addWatchList.bind(this);
        this.getIfWatched = this.getIfWatched.bind(this);
        this.deleteFromWatchList = this.deleteFromWatchList.bind(this);
        this.addWtchLaterList = this.addWatchLaterList.bind(this);
        this.getIfWillWatch = this.getIfWillWatch.bind(this);
        this.deleteFromWatchLaterList = this.deleteFromWatchLaterList.bind(this);
        this.saveDbRate = this.saveDbRate.bind(this);
        this.getData = this.getData.bind(this);
        actions.getFilmDetails(this.props.location.search.split(":")[1]);
        actions.getFilmCredits(this.props.location.search.split(":")[1]);
        //Eğer "Link" vasıtasıyla "state" gönderildiyse: this.props.location.state.id
        actions.getVideos(this.props.location.search.split(":")[1]);
        this.stores = [FilmDetailsStore, BoxOfficeStore];
        this.getIfWatched();
        this.getIfWillWatch();
        this.getData();
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

    async getData() {
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        if (loginData) {
            await getRate().then(response => {
                this.setState({ rates: response.data })
            })
            var currentFilmId = window.location.search.split(":")[1];
            if (this.state.rates.length != 0) {
                var rates = this.state.rates;
                let rateBool = false;
                for (let i = 0; i < rates.length; i++) {
                    if (rates[i].user_id == loginData.id && rates[i].rating_movie_id == currentFilmId) {
                        rateBool = true;
                        this.setState({ rating: rates[i].rating_value, rateId: rates[i].id })
                        break;
                    } else { rateBool = false; }
                }
                return rateBool;
            }
        }
    }

    giveRate(newRating) {
        this.setState({
            rating: newRating
        });
        if (this.state.rating == "0") {
            this.saveDbRate(newRating, "post");
        } else {
            this.saveDbRate(newRating, "update");
        }
    }

    saveDbRate(rating, UptOrDlt) {
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        var rate = {
            rating_value: rating,
            user_id: loginData.id,
            rating_movie_id: this.props.location.search.split(":")[1]
        }
        if (UptOrDlt == "post") { sendRate(rate); }
        else if (UptOrDlt == "update") { updateRate(rate, this.state.rateId) }
    }

    renderCastCrewCard(data, choice) {
        let castOrCrew = "";
        if (choice == "cast")
            castOrCrew = <p>Role: {data.character}</p>;
        else if (choice == "crew")
            castOrCrew = <p>
                Department: {data.department} <br />
                Job: {data.job}
            </p>;

        return (
            <Link to={{ pathname: "/celeb-detail", search: "?id:" + data.id, }} style={{ textDecoration: 'none' }}>
                <Card style={{ width: 120, margin: 3 }}>
                    <CardImg top width="100%" style={{ height: 177 }} src={
                        (data.profile_path ? Poster_Link + data.profile_path : UnknownProfile)} alt="Photo" />
                    <CardBody style={{ padding: 10, minHeight: 80 }}>
                        <CardTitle style={{ fontSize: 12 }}>{data.name}</CardTitle>
                        <CardSubtitle style={{ fontSize: 10 }}>
                            {castOrCrew}
                        </CardSubtitle>
                    </CardBody>
                </Card>
            </Link>
        )
    }

    renderCredits(film_details) {
        let cast = "", crew = "";

        if (this.state.credits) {
            cast = (this.state.credits.cast.map((data) =>
                this.renderCastCrewCard(data, "cast")
            ))
            crew = (this.state.credits.crew.map((data) =>
                this.renderCastCrewCard(data, "crew")
            ))
        }

        return (
            <CardText className="overviewStyle">
                <hr /><h5>Overview</h5>
                {film_details.overview}
                <hr /><h5>Cast</h5>
                <Row>
                    {cast.slice(0, 10)}
                    {this.state.showMoreBtnVisbltyCast ?
                        <Button color="link" style={{ textDecoration: 'none' }} onClick={() => this.setState({ showMoreBtnVisbltyCast: false })}>Show More</Button>
                        : cast.slice(10)} {/* cast.slice(10) ile 10. itemden sonrakinleri alıyor. */}
                </Row>
                <h5>Crew</h5>
                <Row>
                    {crew.slice(0, 10)}
                    {this.state.showMoreBtnVisbltyCrew ?
                        <Button color="link" style={{ textDecoration: 'none' }} onClick={() => this.setState({ showMoreBtnVisbltyCrew: false })}>Show More</Button>
                        : crew.slice(10)}
                </Row>
                {/* {this.state.credits ? this.state.credits.crew.map((data) =>
                    <Link to={{
                        pathname: "/celeb-detail",
                        search: "?id:" + data.id,
                        //state: { card: card, }
                    }}> {data.name + " (" + data.job + "), "}
                    </Link>) : ""} */}
            </CardText>
        )
    }

    addWatchList() {
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        addWatchedList(loginData.id, this.props.location.search.split(":")[1])
        return window.location.reload(false);
    }

    deleteFromWatchList() {
        deleteFromWatchedList(this.state.filmWatchlistApiId)
        return window.location.reload(false);
    }

    getIfWatched() {
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        if (loginData != null) {
            const filmID = window.location.search.split(":")[1];
            getWatchedList(loginData.username).then(response => {
                for (let i = 0; i < response.data.watchlist.length; i++) {
                    if (response.data.watchlist[i].watchlist_movie_id == filmID) {
                        this.setState({ filmWatchlistApiId: response.data.watchlist[i].id, watchedListButton: true })
                        return;
                    } else {
                        this.setState({ filmWatchlistApiId: response.data.watchlist[i].id, watchedListButton: false })
                    }
                }
            })
                .catch(error => {
                    return console.log(error.response)
                });
        }
    }

    addWatchLaterList() {
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        addWatchLaterList(loginData.id, window.location.search.split(":")[1])
        return window.location.reload(false);
    }

    deleteFromWatchLaterList() {
        deleteFromWatchLaterList(this.state.filmWatchLaterApiId)
        return window.location.reload(false);
    }

    getIfWillWatch() {
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        if (loginData != null) {
            const filmID = window.location.search.split(":")[1];
            getWatchLaterList(loginData.username).then(response => {
                for (let i = 0; i < response.data.watchlater.length; i++) {
                    if (response.data.watchlater[i].watchlater_movie_id == filmID) {
                        this.setState({ filmWatchLaterApiId: response.data.watchlater[i].id, watchLaterListButton: true })
                        return;
                    } else {
                        this.setState({ filmWatchLaterApiId: response.data.watchlater[i].id, watchLaterListButton: false })
                    }
                }
            })
                .catch(error => {
                    return console.log(error.response)
                });
        }
    }

    renderBottomButtons(film_details) {
        const loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        return (
            <CardBlock >
                <Link to={{
                    pathname: "/comment-page",
                    search: ("?id:" + film_details.id), //"?film=" + card.title.replace(" ", "-")+ ""
                    //state: { id: card.id },
                }}>
                    <Button color="secondary" style={{ marginLeft: -10 }}>
                        Comments
                        </Button>
                </Link>
                {loginData ?
                    (this.state.watchedListButton ? <Button color="danger" style={{ margin: 5 }} onClick={this.deleteFromWatchList}>Remove Watchlist</Button> : <Button color="success" style={{ margin: 5 }} onClick={this.addWatchList}>Add Watchlist</Button>)
                    : ""
                }
                {loginData ?
                    (this.state.watchLaterListButton ? <Button color="danger" style={{ margin: 5 }} onClick={this.deleteFromWatchLaterList}>Remove Watch Later</Button> : <Button color="primary" onClick={this.addWatchLaterList}>Watch Later</Button>)
                    : ""
                }
            </CardBlock>
        )
    }

    renderContent() {
        const film_details = this.state.film_details;
        const videos = this.state.videos;
        var film_video = Youtube_Link;
        // console.log(this.state.videos);

        for (let i = 0; i < videos.length; i++) {
            if (videos[i].type.includes("Trailer")) {
                film_video += videos[i].key;
                // console.log(film_video);
                break;
            } else if (videos[i].type.includes("Teaser")) {
                film_video += videos[i].key;
                break;
            }
        }

        let rendereds;
        rendereds = (
            <Card className="cardStyle">
                {(film_video != Youtube_Link) ? <div className="embed-container"><iframe src={film_video} width="100%" height="100%" type="text/html" frameBorder="0" allowfullscreen></iframe></div> : ""}


                <CardTitle className="titleStyle"><b>{film_details.original_title}</b></CardTitle>
                <hr />
                <CardBlock /*style={{ border: '1px solid #d6d7da'}}*/>
                    <div>
                        <div style={{ float: 'left', width: '25%', }}>
                            <CardImg className="imgStyle" width={'100%'} src={Poster_Link + film_details.poster_path} />
                            <div className="bottomStyle">
                                <StarRating sendRate={this.giveRate} rating={this.state.rating} collapse={true} />
                                <Badge color="info" pill style={{ float: 'right', marginTop: '10%' }}>{this.state.rating} / 10</Badge>
                            </div>
                        </div>
                        <div style={{ float: 'right', width: '70%', marginLeft: 10 }}>
                            <CardText><b>Runtime: </b>{film_details.runtime} min</CardText><hr />
                            <CardText><b>Release Date: </b>{film_details.release_date}</CardText><hr />
                            <CardText><b>Genres: </b>{this.getCommadString(film_details.genres)}</CardText><hr />
                            <CardText><b>Production Companies: </b>{this.getCommadString(film_details.production_companies)}</CardText><hr />
                            {film_details.budget ? <div><CardText><b>Production Budget: </b>{film_details.budget}</CardText><hr /></div> : ""}
                            <CardText><b>Production Countries: </b>{this.getCommadString(film_details.production_countries)}</CardText><hr />
                            <CardText><b>Spoken Languages: </b>{this.getCommadString(film_details.spoken_languages)}</CardText><hr />
                            {film_details.homepage ? <div><CardText><b>Homepage: </b><a href={film_details.homepage}>{film_details.homepage}</a></CardText><hr /></div> : ""}
                        </div>
                    </div>
                </CardBlock>
                <CardBlock style={{ marginBottom: -50 }}>
                    < hr />
                    {this.renderBottomButtons(film_details)}
                </CardBlock>
                <CardBlock>
                    {this.renderCredits(film_details)}
                </CardBlock>
                {/* <CardSubtitle className="subtitleStyle"></CardSubtitle> */}
            </Card>
        )

        return rendereds
    }

    render() {
        document.title = (this.state.film_details) ? this.state.film_details.original_title + " - MovieBank" : "MovieBank";
        return (
            <div>
                <NavigationBar />
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