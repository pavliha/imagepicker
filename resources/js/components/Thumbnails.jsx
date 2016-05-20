import React from "react";
import ReactDOM from "react-dom";

class Thumbnails extends React.Component {
    constructor(props) {
        super(props);

    }
    render(){
        return this.props.data.map((url)=>{
            return <img src={url} className="block_handled-image_img"/>
        })
    }
}
export default Thumbnails;