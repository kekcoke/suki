import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

/**
 * Map state. Returns user object. 
 * @param {*} param  User object
 * @returns CurrentUser context
 */
const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

/**
 * React hook. Eval currentUser. If currentUser
 * changes (as dependency), useEffect callback runs.
 * @param {*} props 
 * @returns currentUser state
 */
const useAuth = props => {
    const { currentUser } = useSelector(mapState);
    const history = useHistory();

    useEffect(() => {
        // state changes and is not logged in, redirect provided with hoc's router history, wrapped in withRouter
        if (!currentUser) {
            history.push('/login');
        }
    }, [currentUser]);
    return currentUser;
};

export default useAuth;
