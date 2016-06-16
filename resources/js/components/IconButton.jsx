import React from "react";

export default class IconButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
        <button className="FlatButton waves-effect waves-white" onClick={this.props.onClick}>
                <i className="material-icons">keyboard_backspace</i>
            </button>
        );

    }
}
