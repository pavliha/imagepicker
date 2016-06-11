/**
 * Created by pavel on 5/20/16.
 */

import React from "react";
import ImageButton from "./ImageButton.jsx";
import ImagePreview from "./ImagePreview.jsx";
import ButtonsGroup from "./ButtonsGroup.jsx";

export default class PreviewPanel extends React.Component {


    defalutState = {
        button: {
            name: "Выбрать фото",
            disabled: false
        },
    };

    constructor(props) {
        super(props);
        this.state = this.defalutState;
    }

    componentDidMount() {
        ee.on("upload-progress", this.handleProgress.bind(this));
        ee.on("photos-load", this.restoreButton.bind(this))

    }

    handleProgress(percent) {
        this.setState({
            button: {name: "Идет загрузка " + percent + "%", disabled: true,}
        });

        if (percent === 100) {
            this.setState({
                button: {name: "Идет обаработка фото...", disabled: true,}
            })
        }
    }

    restoreButton() {
        this.setState(this.defalutState)
    }

    render() {
        return (
            <div className="PreviewPanel">
                <ImagePreview/>
                <ButtonsGroup>
                    <ImageButton>{this.state.button.name}</ImageButton>
                </ButtonsGroup>

            </div>
        );
    }

}