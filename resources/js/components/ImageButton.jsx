import React from "react";
import ReactDOM from "react-dom";
import RaisedButton from 'material-ui/RaisedButton';

class ImageButton extends React.Component {

    styles = {
        button: {
            padding: 0,
        },
        ImageInput: {
            background: "#0072ff",
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
        },
    };

    constructor(props) {
        super(props);

    }

    render() {
        return(
            <RaisedButton
                label={this.props.children}
                labelPosition="before"
                style={this.styles.button}
                disabled={this.props.disabled}
                accept="image/x-png, image/gif, image/jpeg" name="image">

                <input
                    type="file"
                    style={this.styles.ImageInput}
                    onChange={this.props.onChange}
                />
            </RaisedButton>
        );
    }
}

export default ImageButton;