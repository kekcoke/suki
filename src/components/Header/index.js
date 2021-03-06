import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import Logo from './../../assets/logo.png';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utils';

const Header = props => {
    const { currentUser } = props;
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

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(Header);
