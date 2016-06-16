import React from "react";
import ImageUploader from "../modules/ImageUploader";

class ImageButton extends React.Component {


    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div className="file-field ImageButton">
                <div className="btn btn-flat">
                    <span>Выбрать фото</span>
                    <input
                        disabled={this.props.disabled}
                        accept="image/x-png, image/gif, image/jpeg" name="image"
                        type="file"
                        onChange={this.uploadImage.bind(this)}
                    />
                </div>
            </div>

        );
    }

    uploadImage(e) {
        let inputFile = e.target.files[0];
        let imageUploader = new ImageUploader(inputFile);
        imageUploader.upload();

    }

}

export default ImageButton;