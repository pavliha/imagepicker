import React from "react";
import ReactDOM from "react-dom";

class Thumbnails extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="flexbox-container">
                {this.props.photos.map((photo)=> {
                    return (
                        <div key={photo} className="block_handled-image">
                            <img src={photo} className="block_handled-image_img"/>
                        </div>)

                })}

            </div>
        )
    }
}
export default Thumbnails;