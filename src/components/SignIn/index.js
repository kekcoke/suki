import React, { useEffect, useState } from 'react';
import Button from './../../components/Forms/Button';
import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/FormInput';
import './styles.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { resetAllAuthForms, signInUser, signInWithGoogle } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({ 
    signInSuccess: user.signInSuccess    
});

const SignIn = props => {
    const { signInSuccess } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (signInSuccess) {
            resetForm();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    
    },[signInSuccess]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));

        // resetForm();
        // props.history.push('/');
    }

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
    }

    const configAuthWrapper = {
        headline: 'Login'
    }; 

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit">
                        Login
                    </Button>
                    <div className="socialSignIn">
                        <div className="row">
                            <Button onClick={handleGoogleSignIn}>
                                Sign in with Google
                                    </Button>
                        </div>
                    </div>
                    <div className="links">
                        <Link to="/recovery">
                            Reset Password
                            </Link>
                    </div>
                </form>
            </div>

        </AuthWrapper>
    )
}

export default withRouter(SignIn);
