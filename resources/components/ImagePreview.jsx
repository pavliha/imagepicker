import React from "react";
import fb from "fabric";
const fabric = fb.fabric;
export default class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false,
        }
    }

    componentWillMount() {
        ee.on('preview-image', this.handlePreviewImage.bind(this));
    }

    handlePreviewImage(previewImage) {
        this.setState({
            previewImage: previewImage,
            display: true,
        });

        let img = new Image();
        img.src = this.state.previewImage;
        img.onload = ()=>{
            let canvas = new fabric.Canvas('EditImage');
            canvas.setWidth(500);
            canvas.setHeight(700);
            let imgInstance = new fabric.Image(img, {
                width: canvas.width,
                left: 100,
                top: 100,
                angle: 0,
                opacity: 0.85
            });
            canvas.add(imgInstance);
        };


    }

    render() {

        if (this.state.previewImage) {

            return (
                <div className="ImagePreview">
                    <canvas className="canvas" id="EditImage"></canvas>
                </div>
            )
        }
        return null;

    }
}