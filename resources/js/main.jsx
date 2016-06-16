/**
 * Created by pavel on 5/12/16.
 */

import React from "react";
import {render} from "react-dom";
import TopBar from "./components/TopBar.jsx";
import UploadProgress from "./components/UploadProgress.jsx";
import ImagePreview from "./components/ImagePreview.jsx";
import Thumbnails from "./components/Thumbnails.jsx";
import Footer from "./components/Footer.jsx";
import emitter from "event-emitter";


window.ee = emitter(); //Initialize event emitter and listeners

class Main extends React.Component {


    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <TopBar/>
                <UploadProgress/>
                <section className="flexbox-container editor-background">
                    <ImagePreview/>
                </section>
               
                <Thumbnails/>
                <Footer/>
            </div>
        )


    }

}

$('.materialboxed').materialbox();

render(<Main />, document.getElementById("app"));