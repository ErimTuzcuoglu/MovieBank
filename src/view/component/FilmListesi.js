import React, { Component } from 'react';
import {
    Container,
    Row, Col, Table
} from 'reactstrap';
import { Poster_Link } from './../../controller/utils/Api';
import CardList from './CardList';
import CelebList from './CelebList';
import Footer from './Footer';
import ContentContainer from './ContentContainer';
import Reflux from 'reflux';
import { PlayingStore } from '../../controller/stores/PlayingStore';
import { NewsStore } from '../../controller/stores/NewsStore';
import { CelebsStore } from '../../controller/stores/CelebStore';


export default class FilmListesi extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [PlayingStore, NewsStore, CelebsStore];
    }

    render() {
        return (
            <div style={{ marginTop: 10, marginLeft: '3%', marginRight: '3%' }} className="w-screen">
                <Container fluid>
                    <Row>
                        <ContentContainer title="Trending of this week">
                            {this.state.playing ? <CardList list={this.state.playing} poster_link={Poster_Link} /> : <div></div>}
                            {/* console.log(this.state.playing) */}
                        </ContentContainer>
                    </Row>
                    <Row>
                        <ContentContainer title="Upcoming">
                            {this.state.news ? <CardList list={this.state.news} poster_link={Poster_Link} /> : <div></div>}
                        </ContentContainer>
                    </Row>
                    <Row>
                        <ContentContainer title="Popular Celebs of this week" style={{height: 700}}>
                            {this.state.celebs ? <CelebList list={this.state.celebs} poster_link={Poster_Link} /> : <div></div>}
                        </ContentContainer>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}