import React from "react";
import AppBar from "material-ui/AppBar";

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
                title={<span style={this.styles.title}>Image filters online</span>}
            />
        );
    }
}

export default TopBar;