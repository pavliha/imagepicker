import React from "react";

export default class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false,
        }
    }

    componentWillMount() {
        ee.on('preview-image', this.loadFabric.bind(this));
    }


    render() {

        if (this.state.previewImage) {

            return (
                <div className="ImagePreview" ref="imagePreview" >
                    <canvas className="canvas" id="EditImage"></canvas>
                </div>
            )
        }
        return null;

    }

    loadFabric(previewImage) {
        this.setState({
            previewImage: previewImage,
            display: true,
        });
        loadScript("fabric.js").then(this.initFabric.bind(this));
    }

    initFabric() {
        var imagePreview = document.querySelector(".ImagePreview");
        console.log(imagePreview);
        //let imagePreview = React.findDOMNode(this);
        let img = new Image();
        img.src = this.state.previewImage;
        let canvas = new fabric.Canvas('EditImage');
        canvas.setWidth(imagePreview.offsetWidth-3);
        canvas.setHeight(imagePreview.offsetHeight);
        img.onload = this.addImage(img, canvas,imagePreview)
    }

    addImage(img, canvas,imagePreview) {

        let ih = img.naturalHeight;
        let iw = img.naturalWidth;

        let width_ratio  = imagePreview.offsetWidth  / iw;
        let height_ratio = imagePreview.offsetHeight / ih;
        let fw,fh;
        if (width_ratio < height_ratio) {
             fw = iw * width_ratio;
             fh = ih*fw/iw;
        } else {
             fh = ih * height_ratio;
             fw = iw*fh/ih;
        }

        let imgInstance = new fabric.Image(img, {
            width: canvas.width,
            left: 0,
            top: 0,
            angle: 0,
            opacity: 1,
        });
        imgInstance.set({
            width:fw,
            height:fh
        });
        console.log(imgInstance);
        canvas.add(imgInstance);

    }
}