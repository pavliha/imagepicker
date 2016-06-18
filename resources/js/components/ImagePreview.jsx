import React from "react";

export default class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false,
            imageUrl: null,
        }
    }

    componentWillMount() {
        ee.on('preview-image', this.loadFabric.bind(this));
    }


    render() {

        if (this.state.imageUrl) {

            return (
                <div className="ImagePreview" ref="imagePreview">
                    <canvas className="canvas" id="EditImage"></canvas>
                </div>
            )
        }
        return null;

    }

    loadFabric(imageUrl) {

        this.setState({
            imageUrl: imageUrl,
            display: true,
        });

        loadScript("fabric.js")
            .then(this.initCanvas.bind(this))
            .then(this.setCanvasSize.bind(this))
            .then(this.addImage.bind(this));
    }

    initCanvas() {

        let canvas;

        if (typeof this.state.canvas !== "object") {
            canvas = new window.fabric.Canvas('EditImage');
            let imageDOM = document.querySelector(".ImagePreview");
            this.setState({canvas, imageDOM});
        }

        return null;

    }

    setCanvasSize() {
        let canvas = this.state.canvas;
        canvas.setWidth(this.state.imageDOM.offsetWidth - 3); //Gotta find better solution
        canvas.setHeight(this.state.imageDOM.offsetHeight);

        return null;

    }

    addImage() {

        let img = new Image();
        
        img.src = this.state.imageUrl;
        
        img.onload = () => {


            let [width,height] = this.fitImageOnCanvas(img);

            var imgInstance = new fabric.Image(img, {
                width: width,
                height: height,
                left: 0,
                top: 0,
                angle: 0,
                opacity: 1,
            });

            this.state.canvas.add(imgInstance);

        };


    }

    fitImageOnCanvas(img){

        let imgHeight = img.naturalHeight;
        let imgWidth = img.naturalWidth;

        let width_ratio = this.state.imageDOM.offsetWidth / imgWidth;
        let height_ratio = this.state.imageDOM.offsetHeight / imgHeight;

        let fw, fh;
        if (width_ratio < height_ratio) {
            fw = imgWidth * width_ratio;
            fh = imgHeight * fw / imgWidth;
        } else {
            fh = imgHeight * height_ratio;
            fw = imgWidth * fh / imgHeight;
        }

        return [fw,fh];
    }
}