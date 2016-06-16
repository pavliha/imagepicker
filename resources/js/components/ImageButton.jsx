import React from "react";
import ImageUploader from "../modules/ImageUploader";

class ImageButton extends React.Component {


    constructor(props) {
        super(props);

    }

    render() {

        return (
                <input
                    disabled={this.props.disabled}
                    className="ImageButton"
                    accept="image/x-png, image/gif, image/jpeg" name="image"
                    type="file"
                    onChange={this.uploadImage.bind(this)}

                />
        );
    }

    uploadImage(e) {
        let inputFile = e.target.files[0];
        let imageUploader = new ImageUploader(inputFile);
        imageUploader.upload();

    }

}

export default ImageButton;