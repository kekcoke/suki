import React from 'react';
import './styles.scss';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { year: new Date().getFullYear() };
    }

    render() {
        return (
            <footer className="footer">
                <div className="wrap">
                    © Suki {this.state.year}. All rights reserved.
                </div>
            </footer>
        )
    }
}

export default Footer;
