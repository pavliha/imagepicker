/**
 * Created by pavel on 5/12/16.
 */
import React from "react";
import ReactDOM from "react-dom";
import ContactList from "./components/ContactList.jsx";
class App extends React.Component {
    render () {
        return (
            <div>
                <h1>Hi {this.props.name}</h1>
                <ContactList />
            </div>
        );
    }
}

ReactDOM.render(<App name="Pavel" /> ,document.getElementById("app"));

