import React from "react";
import EventEmitter from "wolfy87-eventemitter";


export default class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display:false,
        }
    }

    componentDidMount(){


        let ee = new EventEmitter();

        ee.addListener('previewImage', this.handlePreviewImage.bind(this));

    }
    handlePreviewImage(previewImage){
        console.log(previewImage);

        this.setState({
            previewImage: previewImage,
            display:true,
        });
    }
    render() {

        if (this.props.previewImage) {

            return (
                <div className="ImagePreview">
                    <img src={this.state.previewImage} className="img" id="EditImage"/>
                </div>
            )
        }
        return null;

    }
}