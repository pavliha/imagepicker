/**
 * Created by pavel on 5/12/16.
 */

import React from "react";
import ReactDOM from "react-dom";

class List extends React.Component{

    render (){

        return(
            <ul>
                {this.props.items.map((item)=>{
                    return <li key={item.id}>{item.author}</li>;
                })}
            </ul>
        )


    }
}

export default List;