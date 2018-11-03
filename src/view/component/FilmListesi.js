import React, { Component } from 'react';
import {
    Container, Col, Row
} from 'reactstrap';
import CardList from './CardList';
import CelebList from './CelebList';
import Footer from './Footer';
import ContentContainer from './ContentContainer';
import Reflux from 'reflux';
import { PlayingStore } from '../../controller/stores/PlayingStore';
import { NewsStore } from '../../controller/stores/NewsStore';
import { CelebsStore } from '../../controller/stores/CelebStore';
import { BoxOfficeStore } from '../../controller/stores/BoxOfficeStore';
import NowPlaying from './NowPlaying';


export default class FilmListesi extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [PlayingStore, NewsStore, CelebsStore, BoxOfficeStore];
    }

    render() {
        return (
            <div style={{ margin: '3%' }} className="w-screen">
                <Container fluid>
                    <Row>
                        <Col sm={12} md={8} lg={9}>
                            <ContentContainer title="Trending of this week">
                                {this.state.playing ? <CardList list={this.state.playing} /> : <div></div>}
                                {/* console.log(this.state.playing) */}
                            </ContentContainer>

                            <ContentContainer title="Upcoming">
                                {this.state.news ? <CardList list={this.state.news} /> : <div></div>}
                            </ContentContainer>

                            <ContentContainer title="Popular Celebs of this week" style={{ height: 700 }}>
                                {this.state.celebs ? <CelebList list={this.state.celebs} /> : <div></div>}
                            </ContentContainer>
                        </Col>
                        <Col>
                            {this.state.boxOffice ? <NowPlaying boxOfficeData={this.state.boxOffice}/> : <div></div>}
                            {/* {this.state.news ? <CardList list={this.state.news} /> : <div></div>} */}
                            
                        </Col>
                    </Row>


                </Container>
                <Footer />
            </div>
        );
    }
}