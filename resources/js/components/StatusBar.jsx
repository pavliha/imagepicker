import React from "react";
import ReactDOM from "react-dom";


class StatusBar extends React.Component {

    styles = {
        button: {
            padding: 0,
        },
        ImageInput: {
            background: "#0072ff",
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
        },
    };
    constructor(props){
        super(props)
    }
    render() {
        return(
            <footer className={this.props.className}>
                {this.props.children}
            </footer>
        )
    }
}

export default StatusBar;