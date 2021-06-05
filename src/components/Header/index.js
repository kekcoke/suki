import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = props => {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/" />
                    <img src={Logo} alt="SukiLogo"></img>
                </div>
                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/signup">
                                Signup
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
