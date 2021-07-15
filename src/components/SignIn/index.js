import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import Button from './../../components/Forms/Button';
import FormInput from './../Forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import { signInUser } from './../../redux/User/user.actions';

import { signInWithGoogle } from './../../firebase/utils';
import { Link, withRouter } from 'react-router-dom';

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess
})

const SignIn = props => {
    const { signInSuccess } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (signInSuccess) {
            resetForm();
            props.history.push('/');
        }
    }, [signInSuccess]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));
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
                            <Button onClick={signInWithGoogle}>
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
