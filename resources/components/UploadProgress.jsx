import React from "react";
import LinearProgress from "material-ui/LinearProgress";
import EventEmitter from "wolfy87-eventemitter";
class UploadProgress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display:false,
        }
    }

    componentDidMount() {
        let ee = new EventEmitter();

        ee.addListener('uploadProgress', this.handleProgress.bind(this));

    }

    handleProgress(percent) {
        this.setState({
            percent: percent,
            display:true,
        });
    }

    render() {

        return (
            <div className="UploadProgress">
                <div className={this.state.display ? "": "hidden"}>
                    <LinearProgress mode="determinate" value={this.state.percent}/>
                </div>
            </div>
        );

    }
}

export default UploadProgress;