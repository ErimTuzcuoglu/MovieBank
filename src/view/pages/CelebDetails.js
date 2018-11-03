import React, { Component } from 'react';
import NavigationBar from '../component/NavigationBar';
import {
    Col, Card,
    CardImg,
    CardBlock,
    CardTitle,
    CardSubtitle,
    CardText,
    Badge
} from 'reactstrap';
import Reflux from 'reflux';
import { CelebsStore } from '../../controller/stores/CelebStore';
import { actions } from '../../actions';
import { Poster_Link } from '../../controller/utils/Api';
import '../css/DetailsPage.css';

export default class CelebDetails extends Reflux.Component {
    constructor(props) {
        super(props);
        actions.getCelebDetails(this.props.location.search.split(":")[1]);
        this.stores = [CelebsStore];
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
        const celeb_details = this.state.celebDetails;
        

        let rendereds;
        rendereds = (
            <div style={{ margin: 'auto', marginTop: 20, width: '60%', minWidth: 300 }}>
                <Card className="cardStyle">
                    
                    <CardTitle className="titleStyle"><b>{celeb_details.name}</b></CardTitle>
                    <hr />
                    <CardBlock /*style={{ border: '1px solid #d6d7da'}}*/>
                        <div>
                            <div style={{ float: 'left', width: '20%', }}><CardImg className="imgStyle" width={'100%'} src={Poster_Link + celeb_details.profile_path} /></div>
                            <div style={{ float: 'right', width: '75%', marginLeft: 10 }}>
                                <CardText><b>Production Companies: </b>{celeb_details.place_of_birth}</CardText><hr />
                                <CardText><b>Genres: </b>{this.getCommadString(celeb_details.gender)}</CardText><hr />
                                {(celeb_details.homepage) ? <div><CardText><b>Homepage: </b><a href={celeb_details.homepage}>{celeb_details.homepage}</a></CardText><hr /></div> : <div></div> }
                            </div>
                        </div>
                    </CardBlock>
                    <CardBlock>
                        <div><CardText className="overviewStyle">{celeb_details.biography}</CardText></div>
                    </CardBlock>
                    <CardSubtitle className="subtitleStyle">
                        <div className="bottomStyle">
                            <Badge color="info" pill style={{ float: 'right' }}>{celeb_details.popularity}</Badge>
                        </div>
                    </CardSubtitle>
                </Card>
            </div>
        )

        return rendereds
    }

    render() {
        document.title = (this.state.celebDetails) ? this.state.celebDetails.name + " - MovieBank" : "MovieBank";
        return (
            <div>
                <div>
                    <NavigationBar />
                </div>
                <div>
                    {(this.state.celebDetails) ? this.renderContent() : <div></div>}
                </div>
            </div>
        );
    }
}