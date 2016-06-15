/**
 * Created by pavel on 5/18/16.
 */

class PhotoSender {

    makeForm(inputFile){
        let formData = new window.FormData();
        formData.append("photo", inputFile);
        return formData;
    }

    constructor(inputFile) {
        this.formData = this.makeForm(inputFile);
        this.res = null;
        this.percent = null;
    }

    send(progress) {
        var that = this;
        return window.$.ajax("api/photo", {
            xhr: function() {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener("progress", progress, false);

                return xhr;
            },
            method: "POST",
            data: that.formData,
            chunking: true,
            cache: false,
            contentType: false,
            processData: false
        })

    }
    

}

export default PhotoSender;