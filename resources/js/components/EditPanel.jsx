import React from "react";
import Range from "./Range.jsx";
import Contrast from "../modules/FabricFilters";

export default class EditPanel extends React.Component {

    defaultState = {
        brightness: 0,
        disabled: true,
    };

    state = this.defaultState;



    componentDidMount() {

        ee.on("canvas-ready", (fabric)=> {

            this.setState({disabled: false});

            this.canvas = fabric.canvas;

            console.log(this.canvas);
            this.imgInstance = fabric.imgInstance;
            this.filters = fabric.filters;
        });

    }

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <div className="EditPanel">
                <Range
                    disabled={this.state.disabled}
                    label="Яркость"
                    value={this.state.brightness}
                    onChange={this.changeBrightness.bind(this)}
                />
                <Range
                    disabled={this.state.disabled}
                    label="Контраст"
                    value={this.state.contrast}
                    onChange={this.changeContrast.bind(this)}
                />
            </div>
        );
    }




    changeBrightness(e) {
        let canvas = this.canvas;
        let img = this.imgInstance;

        this.setState({brightness: e.target.value});


        this.applyFilter(5,new this.filters.Brightness({
                brightness: parseInt(e.target.value, 10)
            }))
    }

    changeContrast(e) {
        let canvas = this.canvas;
        let img = this.imgInstance;

        this.setState({contrast: e.target.value});

        this.applyFilter(5,new Contrast({
            contrast: parseInt(e.target.value, 10)
        }))
    }

    applyFilter(index, filter) {
        let canvas = this.canvas;
        var obj = canvas.getActiveObject();
        obj.filters[index] = filter;
        obj.applyFilters(canvas.renderAll.bind(canvas));
    }



}