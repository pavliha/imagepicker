import React from "react";
import ReactDOM from "react-dom";
import Range from "./Range.jsx";
import FlatButton from 'material-ui/FlatButton';

class EditPanel extends React.Component {

    defaultState = {
        brightness: 0,
        saturation: 0,
        exposure: 0,
        sepia: 0,
        hue:0,
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }



    render() {

        return (
            <div className="EditPanel">
                <Range
                    disabled={this.props.disabled}
                    label="Яркость"
                    value={this.state.brightness}
                    onChange={this.handleBrightness.bind(this)}
                />
                <Range
                    disabled={this.props.disabled}
                    label="Насыщенность"
                    value={this.state.saturation}
                    onChange={this.handleSaturation.bind(this)}
                />
                <Range
                    disabled={this.props.disabled}
                    label="Экспозиция"
                    value={this.state.exposure}
                    onChange={this.handleExposure.bind(this)}
                />
                <Range
                    disabled={this.props.disabled}
                    label="Сепия"
                    value={this.state.sepia}
                    onChange={this.handleSepia.bind(this)}
                />
                <Range
                    disabled={this.props.disabled}
                    label="Оттенок"
                    value={this.state.hue}
                    onChange={this.handleHue.bind(this)}
                />
                <div className="center">
                    <FlatButton label="Сбросить"  disabled={this.props.disabled} onClick={this.handleReset.bind(this)} />
                </div>

            </div>
        );
    }



    handleBrightness(e, value) {
        this.setState({brightness: value});
        this.applyFilter(this.state);
    }

    handleSaturation(e, value) {
        this.setState({saturation: value});
        this.applyFilter(this.state);
    }

    handleExposure(e, value) {
        this.setState({exposure: value});
        this.applyFilter(this.state);
    }

    handleSepia(e, value) {
        this.setState({sepia: value});
        this.applyFilter(this.state);
    }

    handleHue(e,value){
        this.setState({hue: value});
        this.applyFilter(this.state);
    }

    applyFilter(v) {
        if (document.querySelector("#EditImage")) {

            Caman("#EditImage", function () {
                this.revert(false);

                if (v.brightness) this.brightness(v.brightness);
                if (v.saturation) this.saturation(v.saturation);
                if (v.exposure) this.exposure(v.exposure);
                if (v.sepia) this.sepia(v.sepia);
                if (v.hue) this.sepia(v.hue);

                this.render();
            });

        }

    }

    handleReset(){
        this.setState(this.defaultState);

        Caman('#EditImage',function() {
            this.revert(false);
            this.render();
        });
    }

}

export default EditPanel;