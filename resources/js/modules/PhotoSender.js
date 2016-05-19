/**
 * Created by pavel on 5/18/16.
 */

class PhotoSender {
    constructor(formData) {
        this.formData = formData;
        this.res = null;
        this.percent = null;
    }

    send() {
        var that = this;
        return $.ajax("api/photo", {
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