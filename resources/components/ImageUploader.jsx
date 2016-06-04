/**
 * Created by pavel on 5/20/16.
 */

import React from "react";
import PhotoSender from "~/resources/modules/PhotoSender";
import ImageButton from "./ImageButton.jsx";
import LinearProgress from "material-ui/LinearProgress";
import Snackbar from "material-ui/Snackbar";
import ImagePreview from "./ImagePreview.jsx";
import ButtonsBlock from "./ButtonsBlock.jsx";


function hif(value, condition) {
    if (condition) {
        return value;
    }
}
class ImageUploader extends React.Component {


    defalutState = {
        buttonName: " Выбрать фото ",
        buttonActive: true,
        percent: 0,
        response: "",
        message: '',
        open: false,
        progressMode: "determinate",
        previewImage: false,
    };

    constructor(props) {
        super(props);
        this.state = this.defalutState;
    }


    render() {
        return (
                <div className="ImageUploader">
                    <ImagePreview previewImage={this.state.previewImage}/>
                    <ButtonsBlock expanded={!this.state.previewImage}>
                        <ImageButton
                            disabled={!this.state.buttonActive}
                            onChange={this.handleInputFileChange.bind(this)}>
                            {this.state.buttonName}
                        </ImageButton>
                        <div className={this.state.previewImage ? "": "hidden"}>
                            <LinearProgress mode="determinate" value={this.state.percent}/>
                        </div>
                    </ButtonsBlock>
                    <Snackbar open={this.state.open} message={this.state.message} autoHideDuration={4000}/>
                </div>
        );
    }


    readTheImage(inputFile) {
        let reader = new window.FileReader();
        reader.onload = ()=> {
            this.setState({
                previewImage: reader.result
            });
        };
        reader.readAsDataURL(inputFile);

    }

    handleResponse(res) {
        this.setState({

            buttonName: " Готово! ",
            buttonActive: true,
            open: true,
            message: '',
        });

        setTimeout(()=> {
            this.setState({
                buttonName: "Выбрать файлы",
                buttonActive: true,
                open: true,
                message: '',
            });
        }, 1000);



        this.props.onPhotosLoad(res);
    }

    handleProgress(e) {
        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded * 100) / e.total);

            this.setState({
                percent: percentage,
                buttonName: "Идет загрузка " + percentage + "%",
            });

            if (percentage === 100) {
                this.setState({
                    buttonName: "Применение фильтров",
                    buttonActive: false,
                    open: true,
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
    }

}

export default ImageUploader;