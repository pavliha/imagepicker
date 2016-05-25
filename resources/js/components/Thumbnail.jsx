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
                    <FlatButton label="Скачать" onClick={this.handleClick.bind(this)}/>
                </CardActions>
            </Card>
        )
    }
    downloadFile(requestURL, data) {
    // "transData" is just a user defined variable to encapsulate "downloadIFrame". It can be named anything as required.
    var downloadIFrame = window.transData.downloadIFrame = window.transData.downloadIFrame || $("#downloadFileiFrame");
    downloadIFrame.attr("src", requestURL + $.param(requestData));
    }
    handleClick(){
        var filter = this.props.label;
        $.ajax("api/photo", {
            method: "GET",
            data: {filter:filter},
        })
            .done(function(response){
                let link = document.createElement("a");
                link.href = "/photos/effect.jpg";
                link.download=filter;
                link.click();

            })
    }
}

export default Thumbnail;