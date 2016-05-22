import React from "react";
import ReactDOM from "react-dom";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
class Thumbnails extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={this.props.className}>
                {this.props.photos.map((photo)=> {
                    return (
                        <Card key={photo[0]} className="Thumbnail">
                            <CardMedia
                                overlay={<CardTitle subtitle={photo[1].toUpperCase()} />}
                            >
                                <img src={photo[0]} className="Thumbnail_img"/>
                            </CardMedia>
                            <CardActions className="center">
                                <a href={photo[0]} download> <FlatButton label="Скачать"/></a>
                                <FlatButton label="Редактировать"/>
                            </CardActions>
                        </Card>
                    )
                })}

            </div>
        )
    }
}
export default Thumbnails;