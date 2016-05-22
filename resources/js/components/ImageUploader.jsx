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


class ImageUploader extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            buttonName: " Выбрать фото ",
            buttonActive: true,
            percent:0,
            response: "",
            message: '',
            open: false,
            previewImage: false
        }

    }

    showTheForm() {
        return (
            <form>
                <ImageButton
                    disabled={!this.state.buttonActive}
                    onChange={this.handleInputFileChange.bind(this)}>
                    {this.state.buttonName}
                </ImageButton>
            </form>
        )
    }

    showThePreviewImage() {
        return (<img src={this.state.previewImage} className="ImageUploader_previewImage"/>);
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
            message: 'Обработка фотографии завершена',
        });
        setTimeout(()=> {
            this.setState({
                buttonName: " Выбрать фото ",
                buttonActive: true,
            });
        }, 3000);
        this.props.onPhotosLoad(res);
    }

    handleProgress(e) {
        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded * 100) / e.total);

            this.setState({
                buttonName: 'Загрузка ' + percentage + "%",
                message: 'Загрузка ' + percentage + "%",
                percent:percentage,
            });

            if (percentage === 100) {
                this.setState({
                    buttonName: "Обработка... ",
                    buttonActive: false,
                    open: true,
                    message: 'Обработка фотографии...',
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
    }

    render() {

        return (
            <div className={this.props.className}>

                {(()=> {
                    if (!this.state.previewImage) {
                        return this.showTheForm();
                    } else {
                        return this.showThePreviewImage();
                    }
                })()}
                {(()=> {
                    if(this.state.previewImage) {
                        return (
                            <StatusBar className="ImageUploader_StatusBar">
                                <LinearProgress mode="determinate" value={this.state.percent} size={4} />
                            </StatusBar>
                        )
                    }
                })()}

                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={4000}
                />
            </div>
        );
    }
}

export default ImageUploader;