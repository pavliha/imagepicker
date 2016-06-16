import React from "react";
import Thumbnail from "./Thumbnail.jsx";

export default class Thumbnails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos:false,
        }
    }

    componentWillMount() {
        ee.on("photos-load", (photos)=> {
            this.setState({photos: photos})
        })
    }

    render() {
        if (!this.state.photos) {
            return null;
        }
        return (
            <div className="Thumbnails">
                {this.state.photos.map((photo)=> {
                    return (
                        <Thumbnail key={photo[0]} photo={photo[0]} label={photo[1].toUpperCase()}/>
                    )
                })}
            </div>
        )
    }

}