import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import { signOutUserStart } from '../../redux/User/user.actions';
import Logo from './../../assets/logo.png';
import './styles.scss';

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});

const Header = props => {
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState);
    
    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Suki Logo"></img>
                    </Link>
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                Search
                            </Link>
                        </li>
                    </ul>
                </nav>
                
                <div className="callToActions">
                    {currentUser && (
                        <ul>
                            <li>
                                <Link to="/cart">
                                    Your Cart ({totalNumCartItems})
                                </Link>
                            </li>
                            <li key={1}>
                                <Link to="/dashboard">
                                    My Account
                                </Link>
                            </li>
                            <li key={2}>
                                <span onClick={() => signOut()}>
                                    Log Out
                                </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            <li key={1}>
                                <Link to="/signup">
                                    Signup
                                </Link>
                            </li>
                            <li key={2}>
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
