/**
 * Created by pavel on 5/20/16.
 */

import React from "react";
import PhotoSender from "~/resources/modules/PhotoSender";
import ImageUploader from "~/resources/modules/ImageUploader";
import UploadProgress from "./UploadProgress.jsx";
import ImageButton from "./ImageButton.jsx";
import ImagePreview from "./ImagePreview.jsx";
import ButtonsGroup from "./ButtonsGroup.jsx";


class EditImage extends React.Component {


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
            <div className="EditImage">
                <ImagePreview/>
                <ButtonsGroup>
                    <ImageButton  onChange={this.uploadImage.bind(this)}/>
                </ButtonsGroup>
                <UploadProgress/>
            </div>
        );
    }

    uploadImage(e) {

        let inputFile = e.target.files[0];
        console.log(inputFile);
        let uploader = new ImageUploader(inputFile);
        uploader.upload()


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

export default EditImage;