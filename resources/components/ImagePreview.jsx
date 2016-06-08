import React from "react";

export default class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display:false,
        }
    }

    componentWillMount(){

        ee.on('preview-image', this.handlePreviewImage.bind(this));

    }
    handlePreviewImage(previewImage){
        this.setState({
            previewImage: previewImage,
            display:true,
        });
    }
    render() {

        if (this.state.previewImage) {

            return (
                <div className="ImagePreview">
                    <img src={this.state.previewImage} className="img" id="EditImage"/>
                </div>
            )
        }
        return null;

    }
}