import React from "react";
import ReactDOM from "react-dom";


class EditPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

export default EditPanel;