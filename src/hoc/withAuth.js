import { useAuth } from './../customHooks';

/**
 * Higher-order component, calls custom hook returning user object / other state from the redux store.
 * @param {*} props 
 * @returns If authenticated, return children / page.
 */
const WithAuth = props => useAuth(props) && props.children;

export default WithAuth;
