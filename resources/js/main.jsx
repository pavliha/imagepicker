/**
 * Created by pavel on 5/12/16.
 */

import React from "react";
import ReactDOM from "react-dom";
import Thumbnails from "./components/Thumbnails.jsx";
import ImageUploader from "./components/ImageUploader.jsx";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Main extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            photos: null
        };
    }

    handleFileChange() {
        this.setState({photos: null});
    }
    handlePhotosLoad(response) {
        this.setState({photos: response})

    }
    render() {

        return (
            <div>
                <section>
                    <ImageUploader
                        className="ImageUploader"
                        onFormChange={this.handleFileChange.bind(this)}
                        onPhotosLoad={this.handlePhotosLoad.bind(this)}
                    />
                </section>

                {(() => {
                    if (this.state.photos != null) {
                        return <Thumbnails photos={this.state.photos} className="Thumbnails"/>
                    }
                })()}

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