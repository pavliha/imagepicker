/**
 * Created by pavel on 5/20/16.
 */

import React from "react";
import ReactDOM from "react-dom";
import PhotoSender from "~/resources/js/modules/PhotoSender";
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';


class ImageUploader extends React.Component {

    styles = {
        button: {
            margin: 0,

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
        }

    }

    handleResponse(res) {

        this.setState({
            buttonName: " Готово! ",
            buttonActive: false,

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
                buttonName: percentage+"%",
            });

            if (percentage === 100) {
                this.setState({
                    buttonName: "Обработка... ",
                    buttonActive: false,
                });
            }

        }
    }

    handleInputFileChange(e) {

        this.props.onFormChange(true);
        e.preventDefault();
        let inputFile = e.target;

        let formData = new window.FormData();
        formData.append("photo", inputFile.files[0]);

        let photoSender = new PhotoSender(formData);

        photoSender.send()
            .done(this.handleResponse.bind(this))
            .uploadProgress(this.handleProgress.bind(this))

    }

    render() {

        return (
            <div>

                <form>
                    <RaisedButton
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
                </form>


            </div>
        );
    }
}

export default ImageUploader;