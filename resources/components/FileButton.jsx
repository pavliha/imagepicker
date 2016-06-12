import React from "react";

export default class FileButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div >
                <input type="file" className="FileButton"/>
            </div>
        );

    }
}
