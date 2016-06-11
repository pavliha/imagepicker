
import PhotoSender from "./PhotoSender";

export default class ImageUploader{

    constructor(inputFile){
        this.inputFile = inputFile;
    }
    onProgress(e){
        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded * 100) / e.total);
            ee.emit("upload-progress",percentage)

        }
    }
    onResponse(response){
        ee.emit("photos-load",response)
    }
    upload(){

        let photoSender = new PhotoSender(this.inputFile);
        photoSender.send()
            .uploadProgress(this.onProgress)
            .done(this.onResponse);

    }
}

// <ImageUploader
//     onImageButtonClick={this.state.ImageButtonClick}
//     onFormChange={this.handleFileChange.bind(this)}
//     onPhotosLoad={this.handlePhotosLoad.bind(this)}
// />

// <div className="ImageUploader">
//     <ImagePreview previewImage={this.state.previewImage}/>
//     <ButtonsBlock expanded={!this.state.previewImage}>
//         <ImageButton
//             disabled={!this.state.buttonActive}
//             onChange={this.handleInputFileChange.bind(this)}>
//             {this.state.buttonName}
//         </ImageButton>
//
//     </ButtonsBlock>
//     <Snackbar open={this.state.open} message={this.state.message} autoHideDuration={4000}/>
// </div>