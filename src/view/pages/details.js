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


export default class details extends Reflux.Component {
    renderContent() {
        const { card, poster_link } = this.props.location.state
        //console.log(card);

        let rendereds;
        if (card !== undefined && card.poster_path && card.title) {
            rendereds = (
                <Col sm={4} md={3} lg={3} xl={2} xxl={1} className="mb-0" style={{ marginRight: 40 }}>
                    <Card style={styles.cardStyle}>
                            <CardImg width={'100%'} src={poster_link + card.poster_path} />
                        <CardBlock style={{ border: '1px solid #d6d7da' }}>
                                <CardTitle style={styles.titleStyle}><b>{card.title}</b></CardTitle>
                            <CardText style={styles.overviewStyle}>{card.overview.length > 100 ? card.overview.substring(0, 99) + "..." : card.overview}</CardText>

                            {/* <Button color="secondary">Onay?</Button> */}
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
        } else {
            rendereds = (<p>Movie is not found or deleted.</p>)
        }
        return rendereds
    }
    
    render() {
        return (
            <div>
                <div>
                    <NavigationBar />
                </div>
                <div>
                    { this.renderContent() }
                </div>
            </div>
        );
    }

    getVideo(){
        Fetch('movie/'+ this.props.location.state.card.id +'/videos').then(function (response) {
            this.setState({ video: response.data.results });
        }.bind(this))
    }
}

const styles = {
    cardStyle: {
        backgroundColor: '#ffffff',
        minWidth: 300,
        minHeight: 300,
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
};