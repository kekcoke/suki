import { useEffect } from 'react';
import { useSelector } from 'react-redux';
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

    useEffect(() => {
        // state changes and is not logged in, redirect provided with hoc's router history, wrapped in withRouter
        if (!currentUser) {
            props.history.push('/login');
        }
    }, [currentUser]);
    return currentUser;
};

export default useAuth;
