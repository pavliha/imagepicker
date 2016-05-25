import React from "react";
import ReactDOM from "react-dom";


class Status extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        if (this.props.children) {
               return null;
        }
        return (
            <div className="status">
                {this.props.children}
            </div>
        )
    }
}

export default Status;