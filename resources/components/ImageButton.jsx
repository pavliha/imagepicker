import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import browser from "detect-browser";
import ImageUploader from "../modules/ImageUploader";
class ImageButton extends React.Component {

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
        FirefoxImageInput: {
            textAlign:"center"
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
                />
            )
        }
        return (
            <RaisedButton
                label={this.props.children}
                labelPosition="before"
                style={this.styles.button}
                disabled={this.props.disabled}
                accept="image/x-png, image/gif, image/jpeg" name="image">

                <input
                    type="file"
                    style={this.styles.ImageInput}
                    onChange={this.uploadImage.bind(this)}
                />
            </RaisedButton>
        );
    }
    
    uploadImage(){
      
        let imageUploader = new ImageUploader();
        imageUploader.openUploadBox()
            .then(imageUploader.upload);
        
    }
    
}

export default ImageButton;