/**
 * Created by pavel on 5/12/16.
 */
import React from "react";
import ReactDOM from "react-dom";
import List from "./components/List.jsx";


class CommentBox extends React.Component {

    DATA = [
        {id: 1, author: "Pete Hunt", text: "This is one comment"},
        {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
    ];

    constructor(props){
        super(props)

    }

    render() {
        return(
            <div><List items={this.DATA} /></div>
            );
    }
}

ReactDOM.render(<CommentBox  />,document.getElementById("app"));