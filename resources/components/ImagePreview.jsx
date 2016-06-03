import React from "react";

class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        if (this.props.previewImage) {

            return (
                <div className="ImagePreview">
                    <img src={this.props.previewImage} className="img" id="EditImage"/>
                </div>
            )
        }

        return null;

    }
}

export default ImagePreview;