import React from "react";
import ReactDOM from "react-dom";


class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        if (this.props.previewImage) {
            return (<img src={this.props.previewImage} className="ImageUploader_previewImage"/>)
        }

        return (
            <form className={this.props.className}>
                {this.props.children}
            </form>
        )


    }
}

export default ImagePreview;