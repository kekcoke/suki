import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './../../assets/logo.png';
import { auth } from './../../firebase/utils';
import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const Header = props => {
    const { currentUser } = useSelector(mapState);
    
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Suki Logo"></img>
                    </Link>
                </div>
                <div className="callToActions">
                    {currentUser && (
                        <ul>
                            <li>
                                <Link to="/dashboard">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <span onClick={() => auth.signOut()}>
                                    Log Out
                                </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/signup">
                                    Signup
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};

export default Header;
