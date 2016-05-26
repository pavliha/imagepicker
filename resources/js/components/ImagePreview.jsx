import React from "react";
import ReactDOM from "react-dom";


class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        if (this.props.previewImage) {
            return (
                <div className="ImagePreview ImagePreview--active">
                    <img src={this.props.previewImage} id="EditImage"/>
                </div>
            )
        }
        return null;


    }
}

export default ImagePreview;