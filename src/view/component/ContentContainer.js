import React, { Component, Children } from 'react';
import { Col,
    Jumbotron,
    Button
} from 'reactstrap';

export default class ContentContainer extends Component {
    render() {
        return (
                <div style={styles.jumbotronStyle}>
                    <h2>{this.props.title}</h2>
                    <hr className="my-2" />
                    <div>{this.props.children}</div>
                </div>
        );
    }
}

const styles = {
    jumbotronStyle: {
        minHeight: 500,
        backgroundColor: '#dddddd',
        padding: 30,
        paddingTop: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderRadius: 10
    }
}