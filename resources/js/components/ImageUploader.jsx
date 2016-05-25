/**
 * Created by pavel on 5/20/16.
 */

import React from "react";
import ReactDOM from "react-dom";
import PhotoSender from "~/resources/js/modules/PhotoSender";
import ImageButton from './ImageButton.jsx';
import StatusBar from "./StatusBar.jsx";
import LinearProgress from 'material-ui/LinearProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import ImagePreview from "./ImagePreview.jsx"
import Status from "./Status.jsx";

class ImageUploader extends React.Component {

    state = {
        buttonName: " Выбрать фото ",
        buttonActive: true,
        percent: 0,
        response: "",
        message: '',
        open: false,
        progressMode: "determinate",
        previewImage: false,
        statusPadding: {paddingBottom: "0px"},
        statusStyle: 0,
    };

    constructor(props) {
        super(props);

    }


    readTheImage(inputFile) {
        let reader = new window.FileReader();
        reader.onload = ()=> {
            this.setState({previewImage: reader.result});
        };
        reader.readAsDataURL(inputFile);

    }

    handleResponse(res) {
        this.setState({
            buttonName: " Готово! ",
            buttonActive: false,
            open: true,
            message: '',
            statusPadding: {paddingBottom: "0px"}
        });

        this.props.onPhotosLoad(res);
    }

    handleProgress(e) {
        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded * 100) / e.total);

            this.setState({
                percent: percentage,
            });

            if (percentage === 100) {
                this.setState({
                    buttonActive: false,
                    open: true,
                    statusPadding: {paddingBottom: "5px"},
                    message: ' идёт применение фильтров...',
                });
            }

        }
    }

    handleInputFileChange(e) {
        e.preventDefault();

        let inputFile = e.target.files[0];

        this.readTheImage(inputFile);

        let photoSender = new PhotoSender(inputFile);

        photoSender.send()
            .uploadProgress(this.handleProgress.bind(this))
            .done(this.handleResponse.bind(this));

        this.props.onFormChange();
        this.setState({"statusStyle": "20px"})
    }

    render() {
        if(this.props.onImageButtonClick){
            var image = this.props.onImageButtonClick;
            image = function(e){
                console.log("hello",e);
            }

        }
        return (
            <div className="ImageUploader">

                <ImagePreview previewImage={this.state.previewImage} className="ImagePreview">
                    <ImageButton
                        disabled={!this.state.buttonActive}
                        onChange={this.handleInputFileChange.bind(this)}>
                        {this.state.buttonName}
                    </ImageButton>
                </ImagePreview>

                <StatusBar className="StatusBar">
                    <Status>{this.state.message}</Status>
                    <LinearProgress mode="determinate" value={this.state.percent}/>
                </StatusBar>

                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={4000}/>
            </div>
        );
    }
}

export default ImageUploader;