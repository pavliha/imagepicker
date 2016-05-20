/**
 * Created by pavel on 5/12/16.
 */
import React from "react";
import ReactDOM from "react-dom";
import Thumbnails from "./components/Thumbnails.jsx";

import ImageUploader from "./components/ImageUploader.jsx";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos:null
        }
    }

    handlePhotosLoad(response) {
        this.setState({photos:response})
    }

    render() {
        return (
            <div>
                <section className="section_source-image">
                    <ImageUploader onPhotosLoad={this.handlePhotosLoad.bind(this)}
                                   className="block_source-image flexbox-container"/>
                </section>
                {(() => {
                    if (this.state.photos) {
                        return <Thumbnails photos={this.state.photos} className="section_handled-image"/>
                    }

                })()}
            </div>
        )
    }
}


ReactDOM.render(<Main/>, document.getElementById("main"));