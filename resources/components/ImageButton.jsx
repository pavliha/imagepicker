import React from "react";
import FlatButton from "material-ui/FlatButton";
import browser from "detect-browser";
import ImageUploader from "../modules/ImageUploader";
class ImageButton extends React.Component {

    styles = {
        button: {
            padding: "-4px",
            color:"#FAFAFA",
            
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
        FirefoxImageInput: {
            textAlign: "center"
        },
    };

    constructor(props) {
        super(props);

    }

    render() {

        if (browser.name === "firefox") {
            return (
                <input
                    type="file"
                    style={this.styles.FirefoxImageInput}
                    onChange={this.uploadImage.bind(this)}
                    disabled={this.props.disabled}
                    className={this.props.className}
                    accept="image/x-png, image/gif, image/jpeg" name="image"
                />
            )
        }
        return (
            <FlatButton
                label={this.props.children}
                labelPosition="before"
                style={this.styles.button}
                disabled={this.props.disabled}
                className="ImageButton"
                accept="image/x-png, image/gif, image/jpeg" name="image">
                <input
                    type="file"
                    style={this.styles.ImageInput}
                    onChange={this.uploadImage.bind(this)}
                />
            </FlatButton>
        );
    }

    uploadImage(e) {
        let inputFile = e.target.files[0];
        let imageUploader = new ImageUploader(inputFile);
        imageUploader.upload();

    }

}

export default ImageButton;