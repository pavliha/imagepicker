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
                <div className="ImagePreview" ref="imagePreview">
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
        let imagePreview = document.querySelector(".ImagePreview");
        //let imagePreview = React.findDOMNode(this);
        let img = new Image();
        img.src = this.state.previewImage;
        let canvas = new window.fabric.Canvas('EditImage');
        canvas.setWidth(imagePreview.offsetWidth - 3); //Gotta find better solution
        canvas.setHeight(imagePreview.offsetHeight);
        img.onload = this.addImage(img,imagePreview)
            .then((fabricImage)=> canvas.add(fabricImage))
    }

    addImage(img, imagePreview) {

        return new Promise((resolve)=>{
            let imgHeight = img.naturalHeight;
            let imgWidth = img.naturalWidth;

            let width_ratio = imagePreview.offsetWidth / imgWidth;
            let height_ratio = imagePreview.offsetHeight / imgHeight;

            let fw, fh;
            if (width_ratio < height_ratio) {
                fw = imgWidth * width_ratio;
                fh = imgHeight * fw / imgWidth;
            } else {
                fh = imgHeight * height_ratio;
                fw = imgWidth * fh / imgHeight;
            }

            let imgInstance = new window.fabric.Image(img, {
                width: fw,
                height: fh,
                left: 0,
                top: 0,
                angle: 0,
                opacity: 1,
            });
            resolve(imgInstance)
        });



    }
}