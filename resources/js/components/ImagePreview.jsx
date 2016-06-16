import React from "react";

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
        loadScript("fabric.js").then((e)=> {
            console.log(e,1);
            this.setState({
                previewImage: previewImage,
                display: true,
            });

            let img = new Image();

            img.src = this.state.previewImage;
            let imagePreview = document.querySelector(".PreviewPanel");
            console.log(imagePreview.offsetWidth);

            let canvas = new fabric.Canvas('EditImage');
            canvas.setWidth(imagePreview.offsetWidth-10); //hot fix make canvas width a bit smaller
            canvas.setHeight(imagePreview.offsetHeight);
            img.onload = this.addImage(img,canvas)
        });



    }

    addImage(img,canvas){
        let imgInstance = new fabric.Image(img, {
            width: canvas.width,
            left: 0,
            top: 0,
            angle: 0,
            opacity:1,
        });
        canvas.add(imgInstance);

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