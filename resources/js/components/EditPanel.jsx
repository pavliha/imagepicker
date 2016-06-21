import React from "react";
import Range from "./Range.jsx";

export default class EditPanel extends React.Component {

    defaultState = {
        brightness: 0,
        disabled: true,
    };

    state = this.defaultState;



    componentDidMount() {
        ee.on("preview-image", ()=> {
            this.setState({disabled: false})
        });
        ee.on("canvas-ready", (obj)=> {
            this.canvas = obj.canvas;

            console.log(this.canvas);
            this.imgInstance = obj.imgInstance;
            this.filters = obj.filters;
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
                    onChange={this.handleBrightness.bind(this)}
                />
            </div>
        );
    }


    handleBrightness(e) {

        this.changeBrightness(e);


    }

    changeBrightness(e) {
        let canvas = this.canvas;
        let img = this.imgInstance;

        this.setState({brightness: e.target.value});


        this.applyFilter(5,new this.filters.Brightness({
                brightness: parseInt(e.target.value, 10)
            }))
    }

    applyFilter(index, filter) {
        let canvas = this.canvas;
        var obj = canvas.getActiveObject();
        obj.filters[index] = filter;
        obj.applyFilters(canvas.renderAll.bind(canvas));
    }



}