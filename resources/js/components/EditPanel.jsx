import React from "react";
import ReactDOM from "react-dom";
import Caman from "caman";

class EditPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        Caman("ImageUploader_previewImage", function () {
            this.vibrance(100).render();
        });
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

export default EditPanel;