import PhotoSender from "./PhotoSender";

export default class ImageUploader {

    openUploadBox() {

        let input = document.querySelector("input[type=file]");
        //input.style = "display:none";

        input.addEventListener("change", function () {
            console.log("hello")
        });
        input.click();




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

    upload(e) {

        this.inputFile = e.target.files[0];

        this.readImage();

        let photoSender = new PhotoSender(this.inputFile);
        photoSender.send()
            .uploadProgress(this.onProgress)
            .done(this.onResponse);

    }

}
