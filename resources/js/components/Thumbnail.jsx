import React from "react";
import ReactDOM from "react-dom";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Thumbnail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <Card className="Thumbnail">
                <CardMedia overlay={<CardTitle subtitle={this.props.label} />}>
                    <img src={this.props.photo} className="Thumbnail_img"/>
                </CardMedia>
                <CardActions className="center">
                    <FlatButton label="Скачать"/>
                    <FlatButton label="Редактировать"/>
                </CardActions>
            </Card>
        )
    }
}

export default Thumbnail;