import React from "react";
import ImageButton from "./ImageButton.jsx";

export default class TopBar extends React.Component {

    styles = {
        title: {
            cursor: 'pointer',
        },
        iconStyle: {
            color: "white",
            width: 96,
            height: 96,
            padding: 0,
        }
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    goBackHome() {
        window.location.href = '/';
    }

    render() {
        return (
            <div className="TopBar">
                <button onClick={this.goBackHome.bind(this)}></button>
                Image filters online
                <div className="ImageButton--correct-block">
                    <ImageButton>Выбрать фото</ImageButton>
                </div>
            </div>
        );
    }
}