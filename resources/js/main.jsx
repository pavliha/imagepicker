/**
 * Created by pavel on 5/12/16.
 */
import React from "react";
import ReactDOM from "react-dom";
//import PhotoSender from "modules/.PhotoSender.jsx"
class ImageLoading extends React.Component {


    constructor(props) {

        super(props)

    }

    handleFormSubmit(e) {

        e.preventDefault();
        let inputFile  = e.target;


        console.log(inputFile.files[0]);

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
                <input type="file" className="hidden" onChange={this.handleFormSubmit.bind(this)} accept="image/x-png, image/gif, image/jpeg" name="image"/>
                <button onClick={this.clickTheFileForm}
                        className=" button button--pipaluk button--inverted
                                    button--round-l button--text-thick button--text-upper">
                    Выбрать фото
                </button>

            </form>
        );
    }
}

ReactDOM.render(<ImageLoading  />, document.getElementById("ImageLoading"));