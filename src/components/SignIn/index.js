import React, { useState } from 'react';
import './styles.scss';
import Button from './../../components/Forms/Button';
import FormInput from './../Forms/FormInput';
import AuthWrapper from './../AuthWrapper';

import { signInWithGoogle, auth } from './../../firebase/utils';
import { Link } from 'react-router-dom';

const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
        } catch (e) {
            console.error(e);
        }
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

export default SignIn;
