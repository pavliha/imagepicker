import React from "react";
import ReactDOM from "react-dom";
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class ImageUploaderCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Card className="ImageUploaderCard">
                <CardMedia>
                    {this.props.children}
                </CardMedia>

            </Card>
        )
    }
}

export default ImageUploaderCard;