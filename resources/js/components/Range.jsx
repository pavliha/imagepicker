import React from "react";
import ReactDOM from "react-dom";

import Slider from 'material-ui/Slider';

class Range extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="Range">
                <div>{this.props.label}</div>
                <Slider
                    className="Slider"
                    min={-100}
                    max={100}
                    defaultValue={0}
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export default Range;