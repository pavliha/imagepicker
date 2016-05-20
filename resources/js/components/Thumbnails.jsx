import React from "react";
import ReactDOM from "react-dom";

class Thumbnails extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        console.log(this.props.photos);

        return (
            <div>
                {this.props.photos.map((photo)=> {
                    return (
                        <div className="block_handled-image">
                            <img src={photo} key={photo} className="block_handled-image_img"/>
                        </div>)

                })}
            </div>
        )
    }
}
export default Thumbnails;