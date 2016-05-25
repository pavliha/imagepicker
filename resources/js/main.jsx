/**
 * Created by pavel on 5/12/16.
 */

import React from "react";
import ReactDOM from "react-dom";

import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Thumbnails from "./components/Thumbnails.jsx";
import ImageUploader from "./components/ImageUploader.jsx";
import EditPanel from "./components/EditPanel.jsx";
import ImageUploaderCard from "./components/ImageUploaderCard.jsx";
import TopBar from "./components/TopBar.jsx";

class Main extends React.Component {


    constructor(props) {

        super(props);

    }


    state = {
        photos: null,
        //imageButtonClick:false
    };

    render() {

        return (
            <div>

                <TopBar/>

                <section className="flexbox-container">

                    <ImageUploaderCard>
                        <ImageUploader
                            onImageButtonClick={this.state.ImageButtonClick}
                            onFormChange={this.handleFileChange.bind(this)}
                            onPhotosLoad={this.handlePhotosLoad.bind(this)}
                        />
                    </ImageUploaderCard>

                    <EditPanel/>

                </section>

                <Thumbnails photos={this.state.photos} className="Thumbnails"/>

            </div>
        )


    }

    //handleInputFileChange(e) {
    //    //var image = handeImageClick(e);
    //    //this.setState({ImageButtonClick: image})
    //}

    handleFileChange() {
        this.setState({photos: null});
    }

    handlePhotosLoad(response) {
        this.setState({photos: response})

    }


}


const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Main />
    </MuiThemeProvider>
);

ReactDOM.render(<App/>, document.getElementById("app"));