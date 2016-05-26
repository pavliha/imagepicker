import React from "react";
import ReactDOM from "react-dom";


class ButtonsBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        var slideEnabled = this.props.expanded ? "ButtonsBlock" : "ButtonsBlock ButtonsBlock--down";
        return (<div className={slideEnabled}>
                {this.props.children}
            </div>
        );

    }
}

export default ButtonsBlock;