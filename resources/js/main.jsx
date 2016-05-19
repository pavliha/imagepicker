/**
 * Created by pavel on 5/12/16.
 */
import React from "react";
import ReactDOM from "react-dom";

import ImageLoading from "./components/ImageLoading.jsx";


class Thumbnails extends React.Component {
    render(){
        return (
            <div className="block_handled-image">
                <img src="/photos/sepia.jpg" className="block_handled-image_img"/>
            </div>
        )
    }
}

ReactDOM.render(<Thumbnails  />, document.getElementById("Thumbnails"));
ReactDOM.render(<ImageLoading  />, document.getElementById("ImageLoading"));