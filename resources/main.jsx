/**
 * Created by pavel on 5/12/16.
 */

import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Thumbnails from "./components/Thumbnails.jsx";
import EditImage from "./components/EditImage.jsx";
import EditPanel from "./components/EditPanel.jsx";
import TopBar from "./components/TopBar.jsx";
import Footer from "./components/Footer.jsx";
//import ImageUploader from "./components/ImageUploader.jsx";

injectTapEventPlugin();
class Main extends React.Component {


    constructor(props) {

        super(props);

    }


    state = {
        photos: null,
        PanelDisabled: true,
        //imageButtonClick:false
    };

    render() {

        return (
            <div>

                <TopBar/>

                <section className="flexbox-container">
                    <EditImage/>
                    <EditPanel disabled={this.state.PanelDisabled}/>
                </section>

                <Thumbnails photos={this.state.photos} className="Thumbnails"/>
                <Footer enabled={this.state.photos}/>
            </div>
        )


    }

    //handleInputFileChange(e) {
    //    //var image = handeImageClick(e);
    //    //this.setState({ImageButtonClick: image})
    //}

    handleFileChange() {
        this.setState({
            photos: null,
            PanelDisabled: false,
        });
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