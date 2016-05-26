import React from "react";
import ReactDOM from "react-dom";
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import {red50} from 'material-ui/styles/colors';

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
                <Slider
                    disabled={this.props.disabled}
                    className="Slider"
                    min={-50}
                    max={50}
                    step={2}
                    defaultValue={0}
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