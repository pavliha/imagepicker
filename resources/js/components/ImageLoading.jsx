import React from "react";
import ReactDOM from "react-dom";
import PhotoSender from "./../modules/PhotoSender.js";
class ImageLoading extends React.Component {


    constructor(props) {

        super(props);
        this.state ={
            buttonName:"Выбрать фото"
        }

    }

    handleProgress(e) {
        if (e.lengthComputable) {
            var percentage = Math.round((e.loaded*100) / e.total);
            this.setState({button:percentage+"%"});

            if(percentage === 100){
                this.setState({buttonName:"Готово!"});
                setTimeout(()=>{this.setState({buttonName:"Выбрать фото"});},3000);

            }

        }
    }

    handleFormSubmit(e) {

        e.preventDefault();
        let inputFile = e.target;

        let formData = new window.FormData();
        formData.append("photo", inputFile.files[0]);

        let photoSender = new PhotoSender(formData);

        photoSender.send()
            .uploadProgress(this.handleProgress.bind(this))

    }

    clickTheFileForm(e) {

        e.preventDefault();
        let button = e.target;
        let form = button.parentNode;
        let inputFile = form.elements["image"];

        inputFile.click();

    }

    render() {
        return (
            <form>
                <input type="file" className="hidden" onChange={this.handleFormSubmit.bind(this)}
                       accept="image/x-png, image/gif, image/jpeg" name="image"/>
                <button onClick={this.clickTheFileForm}
                        className=" button button--pipaluk button--inverted
                                    button--round-l button--text-thick button--text-upper">
                    {this.state.buttonName}
                </button>

            </form>
        );
    }
}

export default ImageLoading;