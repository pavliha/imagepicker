/**
 * Created by pavel on 5/12/16.
 */

import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Thumbnails from "./components/Thumbnails.jsx";
import PreviewPanel from "./components/PreviewPanel.jsx";
import EditPanel from "./components/EditPanel.jsx";
import TopBar from "./components/TopBar.jsx";
import Footer from "./components/Footer.jsx";
import emitter from "event-emitter";


window.ee = emitter(); //Initialize event emitter and listeners
injectTapEventPlugin(); //Initialize Material UI theme

class Main extends React.Component {


    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>

                <TopBar/>

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

const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Main />
    </MuiThemeProvider>
);

ReactDOM.render(<App/>, document.getElementById("app"));