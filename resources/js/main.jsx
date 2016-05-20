/**
 * Created by pavel on 5/12/16.
 */
import React from "react";
import ReactDOM from "react-dom";
import Thumbnails from "./components/Thumbnails.jsx";
import PhotoSender from "./modules/PhotoSender";


class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <section className="section_source-image">
                    <ImageLoading className="block_source-image flexbox-container" id="ImageLoading">
                    </ImageLoading>

                </section>

                <section className="section_handled-image" id="Thumbnails">sdf</section>
            </div>
        )
    }
}


//class ImageLoading extends React.Component {
//
//
//    constructor(props) {
//
//        super(props);
//        this.state ={
//            buttonName:"Выбрать фото",
//            response:""
//        }
//
//    }
//
//    handleResponse(res){
//
//       this.setState({"response":res});
//    }
//
//    handleProgress(e) {
//        if (e.lengthComputable) {
//            var percentage = Math.round((e.loaded*100) / e.total);
//            this.setState({button:percentage+"%"});
//
//            if(percentage === 100){
//                this.setState({buttonName:"Готово!"});
//                setTimeout(()=>{this.setState({buttonName:"Выбрать фото"});},3000);
//
//            }
//
//        }
//    }
//
//    handleFormSubmit(e) {
//
//        e.preventDefault();
//        let inputFile = e.target;
//
//        let formData = new window.FormData();
//        formData.append("photo", inputFile.files[0]);
//
//        let photoSender = new PhotoSender(formData);
//
//        photoSender.send()
//            .done(this.handleResponse.bind(this))
//            .uploadProgress(this.handleProgress.bind(this))
//
//    }
//
//    clickTheFileForm(e) {
//
//        e.preventDefault();
//        let button = e.target;
//        let form = button.parentNode;
//        let inputFile = form.elements["image"];
//
//        inputFile.click();
//
//    }
//
//    render() {
//        return (
//            <form>
//                <input type="file" className="hidden" onChange={this.handleFormSubmit.bind(this)}
//                       accept="image/x-png, image/gif, image/jpeg" name="image"/>
//                <button onClick={this.clickTheFileForm}
//                        className=" button button--pipaluk button--inverted
//                                    button--round-l button--text-thick button--text-upper">
//                    {this.state.buttonName}
//                </button>
//                <Thumbnails data={this.state.response}/>
//            </form>
//        );
//    }
//}


//ReactDOM.render(<Thumbnails  />, document.getElementById("Thumbnails"));
ReactDOM.render(<ImageLoading/>, document.getElementById("ImageLoading"));