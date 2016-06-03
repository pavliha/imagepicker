import React from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import ActionHome from "material-ui/svg-icons/navigation/arrow-back";

class TopBar extends React.Component {

    styles = {
        title: {
            cursor: 'pointer',
        },
        iconStyle:{
            color:"white",
            width: 96,
            height: 96,
            padding: 0,
        }
    };

    constructor(props) {
        super(props);
        this.state = {}
    }
    goBackHome(){
        window.location.href = '/';
    }
    render() {
        return (
            <AppBar
                iconElementLeft={<IconButton onClick={this.goBackHome.bind(this)}><ActionHome /></IconButton>}
                title={<span style={this.styles.title}>Image filters online</span>}
            />
        );
    }
}

export default TopBar;