import React from "react";
import ReactDOM from "react-dom";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
class Thumbnails extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        if(!this.props.photos){
            return null;
        }
        return (
            <div className={this.props.className}>
                {this.props.photos.map((photo)=> {
                    return (
                        <Card key={photo[0]} className="Thumbnail">
                            <CardMedia overlay={<CardTitle subtitle={photo[1].toUpperCase()} />}>
                                <img src={photo[0]} className="Thumbnail_img"/>
                            </CardMedia>
                            <CardActions className="center">
                                <FlatButton label="Скачать"/>
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