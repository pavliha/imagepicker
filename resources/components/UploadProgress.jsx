import React from "react";

class UploadProgress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display:false,
        }
    }

    componentWillMount() {
        ee.on('upload-progress', this.handleProgress.bind(this));
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
                    <div class="progress">
                        <div class="determinate" style={{width: this.state.percent+"%"}}></div>
                    </div>
                </div>
            </div>
        );

    }
}

export default UploadProgress;