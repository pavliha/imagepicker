/**
 * Created by pavel on 5/12/16.
 */

import React from "react";
import {render} from "react-dom";
import Thumbnails from "./components/Thumbnails.jsx";
import PreviewPanel from "./components/PreviewPanel.jsx";
import EditPanel from "./components/EditPanel.jsx";
import TopBar from "./components/TopBar.jsx";
import Footer from "./components/Footer.jsx";
import UploadProgress from "./components/UploadProgress.jsx";
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
                    <PreviewPanel/>
                    <EditPanel/>
                </section>

                <Thumbnails/>
                <Footer/>
            </div>
        )


    }

}


render(<Main />, document.getElementById("app"));