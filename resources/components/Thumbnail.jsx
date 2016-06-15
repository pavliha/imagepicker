import React from "react";

class Thumbnail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <div className="Thumbnail">
                <img src={this.props.photo} className="Thumbnail_img"/>
                <button value="Скачать" onClick={this.handleClick.bind(this)}/>
            </div>
        )
    }

    downloadFile(requestURL, data) {
        // "transData" is just a user defined variable to encapsulate "downloadIFrame". It can be named anything as required.
        var downloadIFrame = window.transData.downloadIFrame = window.transData.downloadIFrame || $("#downloadFileiFrame");
        downloadIFrame.attr("src", requestURL + $.param(requestData));
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