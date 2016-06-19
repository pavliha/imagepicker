
import React from "react";
import Range from "./Range.jsx";
import ArrowButton from "./ArrowButton.jsx";

class EditPanel extends React.Component {

    defaultState = {
        brightness: 0,
        saturation: 0,
        exposure: 0,
        sepia: 0,
        hue:0,
        disabled:true
    };

    componentDidMount(){
        ee.on("preview-image",()=>{
            this.setState({disabled:false})
        });
        ee.on("canvas-init",(canvas)=>{
            this.setState({canvas})
        });
        ee.on("add-photo-to-canvas",(imgInstance)=>{
            this.setState({imgInstance})

        });
    }
    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }



    render() {

        return (
            <div className="EditPanel">
                <ArrowButton/>
                <Range
                    disabled={this.state.disabled}
                    label="Яркость"
                    value={this.state.brightness}
                    onChange={this.handleBrightness.bind(this)}
                />
                <Range
                    disabled={this.state.disabled}
                    label="Насыщенность"
                    value={this.state.saturation}
                    onChange={this.handleSaturation.bind(this)}
                />
                <Range
                    disabled={this.state.disabled}
                    label="Экспозиция"
                    value={this.state.exposure}
                    onChange={this.handleExposure.bind(this)}
                />
                <Range
                    disabled={this.state.disabled}
                    label="Сепия"
                    value={this.state.sepia}
                    onChange={this.handleSepia.bind(this)}
                />
                <Range
                    disabled={this.state.disabled}
                    label="Оттенок"
                    value={this.state.hue}
                    onChange={this.handleHue.bind(this)}
                />
                <div className="center">
                    <button label="Сбросить"  disabled={this.state.disabled} onClick={this.handleReset.bind(this)} />
                </div>

            </div>
        );
    }



    handleBrightness(e, value) {
        this.setState({brightness: value});

        this.state.imgInstance.filters.push(
            new fabric.Image.filters.Brightness({ brightness: value }));
        this.state.imgInstance.applyFilters(this.state.canvas.renderAll.bind(this.state.canvas));
        this.state.canvas.add(this.state.imgInstance);
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

        //Nothing

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