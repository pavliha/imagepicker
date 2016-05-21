import React from "react";
import ReactDOM from "react-dom";

class Thumbnails extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={this.props.className}>
                {this.props.photos.map((photo)=> {
                    return (
                        <div key={photo} className="Thumbnail">
                            <img src={photo} className="Thumbnail_img"/>
                        </div>)
                })}

            </div>
        )
    }
}
export default Thumbnails;