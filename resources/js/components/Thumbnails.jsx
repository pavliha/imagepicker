import React from "react";
import ReactDOM from "react-dom";
import Thumbnail from "./Thumbnail.jsx";
class Thumbnails extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        if(!this.props.photos){
            return null;
        }
        return (
            <div className={this.props.className}>
                {this.props.photos.map((photo)=> {
                    return (
                       <Thumbnail
                           key={photo[0]}
                           photo={photo[0]}
                           label={photo[1].toUpperCase()}
                       />
                    )
                })}
            </div>
        )
    }

}
export default Thumbnails;