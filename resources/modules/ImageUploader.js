import PhotoSender from "./PhotoSender";

export default class ImageUploader {


    constructor(inputFile){

        this.inputFile = inputFile;
    }


    onProgress(e) {

        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded * 100) / e.total);
            ee.emit("upload-progress", percentage)

        }
    }

    onResponse(response) {

        ee.emit("photos-load", response)
    }

    readImage() {

        let reader = new window.FileReader();

        reader.readAsDataURL(this.inputFile);

        reader.onload = ()=> {
            let image = reader.result;
            ee.emit('preview-image', image);

        };
    }

    upload() {

        this.readImage();

        let photoSender = new PhotoSender(this.inputFile);
        photoSender.send(this.onProgress)
            .done(this.onResponse);

    }

}
