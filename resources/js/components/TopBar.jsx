import React from "react";
import ReactDOM from "react-dom";

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import ImageButton from "./ImageButton.jsx";

class TopBar extends React.Component {

    styles = {
        title: {
            cursor: 'pointer',
        },
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <AppBar
                title={<span style={this.styles.title}>Image picker</span>}
            />
        );
    }
}

export default TopBar;