import React from "react";


class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hidden:true
        }
    }

    componentWillMount(){
        ee.on("photos-load",()=>{
           this.setState({hidden:false})
        });
    }
    render() {
        if(this.state.hidden){
            return false;
        }
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