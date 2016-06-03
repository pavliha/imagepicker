import React from "react";
import FontIcon from "material-ui/FontIcon";
import {red50} from "material-ui/styles/colors";

class Range extends React.Component {

    state = {

    };

    constructor(props) {
        super(props);
    }

    render() {


        return (
            <div className="Range">
                <div className={this.labelColor(this.props.disabled)}>{this.props.label}</div>
                <input type="range"
                    disabled={this.props.disabled}
                    min={-50}
                    max={50}
                    step={5}
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
                <div>
                    <FontIcon className="material-icons" color={red50}>close</FontIcon>
                </div>
            </div>
        );
    }

    labelColor(condition) {
        if(condition){
          return "label--disabled"
        }
        else{
            return "label"
        }


    }
}

export default Range;