
import React from "react";
import Range from "./Range.jsx";
import ArrowButton from "./ArrowButton.jsx";

export default class EditPanel extends React.Component {

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



    handleBrightness(e) {
        let canvas = this.state.canvas;
        let img = this.state.imgInstance;

        this.setState({brightness: e.target.value});


        canvas.clear();
        img.filters.push(
            new fabric.Image.filters.Brightness({ brightness: e.target.value }));
        img.applyFilters(this.state.canvas.renderAll.bind(canvas));
        canvas.add(img);
    }

    handleSaturation(e) {
        this.setState({saturation: e.target.value});
        this.applyFilter(this.state);
    }

    handleExposure(e) {
        this.setState({exposure: e.target.value});
        this.applyFilter(this.state);
    }

    handleSepia(e) {
        this.setState({sepia: e.target.value});
        this.applyFilter(this.state);
    }

    handleHue(e){
        this.setState({hue: e.target.value});
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