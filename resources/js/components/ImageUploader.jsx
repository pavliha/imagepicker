/**
 * Created by pavel on 5/20/16.
 */

import React from "react";
import ReactDOM from "react-dom";
import PhotoSender from "~/resources/js/modules/PhotoSender";
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';


class ImageUploader extends React.Component {

    styles = {
        button: {
            padding: 0,
        },
        ImageInput: {
            background: "#0072ff",
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
        },
    };

    constructor(props) {

        super(props);
        this.state = {
            buttonName: " Выбрать фото ",
            buttonActive: true,
            response: "",
            message: '',
            open: false,
        }

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

        this.props.onFormChange();
        e.preventDefault();
        let inputFile = e.target.files[0];

        let reader = new window.FileReader();
        reader.onload = ()=> {
            this.setState({previewImage:reader.result});
        };
        reader.readAsDataURL(inputFile);

        let formData = new window.FormData();
        formData.append("photo", inputFile);

        let photoSender = new PhotoSender(formData);

        photoSender.send()
            .done(this.handleResponse.bind(this))
            .uploadProgress(this.handleProgress.bind(this))

    }

    render() {

        var preview;

        if(!this.state.previewImage){

            preview = ()=>{
                return (
                    <form>
                        <RaisedButton
                            onTouchTap={this.handleTouchTap}
                            label={this.state.buttonName}
                            labelPosition="before"
                            style={this.styles.button}
                            disabled={!this.state.buttonActive}
                            accept="image/x-png, image/gif, image/jpeg" name="image">

                            <input
                                type="file"
                                style={this.styles.ImageInput}
                                onChange={this.handleInputFileChange.bind(this)}
                            />
                        </RaisedButton>
                        <Snackbar
                            open={this.state.open}
                            message={this.state.message}
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                        />
                    </form>
                )
            }

        }
        else{
            preview = ()=> {
                return <img src={this.state.previewImage} className="previewImage"/>
            }

        }


        return (
            <div className={this.props.className}>

                {preview()}

                <footer className="ImageUploader_status">
                    <RaisedButton
                        onTouchTap={this.handleTouchTap}
                        label={this.state.buttonName}
                        labelPosition="before"
                        style={this.styles.button}
                        disabled={!this.state.buttonActive}
                        accept="image/x-png, image/gif, image/jpeg" name="image">

                        <input
                            type="file"
                            style={this.styles.ImageInput}
                            onChange={this.handleInputFileChange.bind(this)}
                        />
                    </RaisedButton>
                </footer>
            </div>
        );
    }
}

export default ImageUploader;