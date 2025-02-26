import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signOutUserStart } from './../redux/User/user.actions';

import Footer from './../components/Footer';
import Header from './../components/Header';
import VerticalNav from './../components/VerticalNav';

const AdminLayout = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div className="adminLayout">
      <Header {...props} />
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/admin">
                  Home
                </Link>
              </li>
              <li>
                <span className="wishlist" onClick={() => history.push('/admin/wishlist')}>
                  Wishlist
                </span>
              </li>
              <li>
                <span className="signOut" onClick={() => signOut()}>
                  Sign Out
                </span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;