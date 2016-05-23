import React from "react";
import ReactDOM from "react-dom";
import Range from "./Range.jsx";

class EditPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        brightness: 0,
        saturation: 0,
        exposure: 0,
        sepia: 0,
    };


    render() {

        return (
            <div className="EditPanel">
                <Range
                    label="Яркость"
                    value={this.state.brightness}
                    onChange={this.handleBrightness.bind(this)}
                />
                <Range
                    label="Насыщенность"
                    value={this.state.saturation}
                    onChange={this.handleSaturation.bind(this)}
                />
                <Range
                    label="Экспозиция"
                    value={this.state.exposure}
                    onChange={this.handleExposure.bind(this)}
                />
                <Range
                    label="Сепия"
                    value={this.state.sepia}
                    onChange={this.handleSepia.bind(this)}
                />
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

    applyFilter(v) {

        Caman("#EditImage", function () {
            this.revert(false);
            this.brightness(v.brightness);
            if (v.saturation) this.saturation(v.saturation);
            if (v.exposure) this.exposure(v.exposure);
            if (v.sepia) this.sepia(v.sepia);
            this.render();
        });

    }

}

export default EditPanel;