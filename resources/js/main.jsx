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
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import EditPanel from "./components/EditPanel.jsx"
class Main extends React.Component {

    styles = {
        title: {
            cursor: 'pointer',
        },
    };

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

                <AppBar
                    title={<span style={this.styles.title}>Image picker</span>}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                    iconElementRight={<FlatButton label="Download photo" />}
                />

                <section className="flexbox-container">
                    <Card className="Card_ImageUploader">

                        <CardMedia>
                            <ImageUploader
                                className="ImageUploader"
                                onFormChange={this.handleFileChange.bind(this)}
                                onPhotosLoad={this.handlePhotosLoad.bind(this)}/>
                        </CardMedia>

                        {(()=> {
                            if (this.state.photos) {
                                return (
                                    <CardActions className="center">
                                        <FlatButton label="Выбрать фото"/>
                                        <FlatButton label="Редактировать"/>
                                    </CardActions>
                                )
                            }
                        })()}

                    </Card>

                    <EditPanel className="EditPanel">
                        hellsdfsdfsdfasdfasdfasdfasdfasdfsadfasdfasdfsdo
                    </EditPanel>
                </section>

                {(() => {
                    if (this.state.photos) {
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