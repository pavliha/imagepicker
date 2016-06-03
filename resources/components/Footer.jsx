import React from "react";


class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <footer className="Footer">
                <div class="Footer-left">
                    <p>Image filters &copy; 2016</p>
                </div>
            </footer>
        );

    }
}

export default Footer;