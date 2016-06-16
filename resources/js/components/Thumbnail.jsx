import React from "react";

class Thumbnail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    
    render() {

        return (
            <div className="Thumbnail">

                <img src={this.props.photo} className="materialboxed"/>
                <button className="btn btn-flat waves-white waves-effect btn--white" onClick={this.handleClick.bind(this)}>Скачать</button>

            </div>
        )
    }
    

    handleClick() {
        var filter = this.props.label;
        $.ajax("api/photo", {
            method: "GET",
            data: {filter: filter},
        })
            .done(function (response) {
                let link = document.createElement("a");
                link.href = "/photos/effect.jpg";
                link.download = filter;
                link.click();

            })
    }
}

export default Thumbnail;