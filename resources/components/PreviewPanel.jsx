/**
 * Created by pavel on 5/20/16.
 */

import React from "react";
import ImageUploader from "~/resources/modules/ImageUploader";
import UploadProgress from "./UploadProgress.jsx";
import ImageButton from "./ImageButton.jsx";
import ImagePreview from "./ImagePreview.jsx";
import ButtonsGroup from "./ButtonsGroup.jsx";

export default class PreviewPanel extends React.Component {


    defalutState = {
        button: {
            name: "Выбрать фото",
            disabled: false
        },
    };

    constructor(props) {
        super(props);
        this.state = this.defalutState;
    }
    
    componentDidMount(){
        ee.on("upload-progress",(percent)=>{
           this.setState({
               button:{
                   name: "Идет загрузка "+percent+"%",
                   disabled:true,
               }
           });

            if(percent === 100){
                this.setState({
                    button:{
                        name: "Идет обаработка фото...",
                        disabled:true,
                    }
                })
            }
        });
        ee.on("photos-load",()=>{
            this.setState(this.defalutState)
        });
    }
    render() {
        return (
            <div className="PreviewPanel">
                <ImagePreview/>
                <ButtonsGroup>
                    <ImageButton onChange={this.uploadImage.bind(this)}>{this.state.button.name}</ImageButton>
                </ButtonsGroup>
                <UploadProgress/>
            </div>
        );
    }

    uploadImage(e) {

        let inputFile = e.target.files[0];

        this.readTheImage(inputFile);

        let uploader = new ImageUploader(inputFile);

        uploader.upload()


    }

    readTheImage(inputFile) {
        let reader = new window.FileReader();

        reader.onload = ()=> {
            let image = reader.result;
            ee.emit('preview-image', image);

        };
        reader.readAsDataURL(inputFile);

    }

}