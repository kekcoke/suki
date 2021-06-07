import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import { auth, handleUserProfile } from './../../firebase/utils';

import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';
import AuthWrapper from './../AuthWrapper';

const SignupComponent = props => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const checkPasswordStrength = (password, confirmPassword) => {
        const err = [];
        if (password !== confirmPassword) {
            err.push('Passwords don\'t Match');
        }
        if (String(password).length < 8) {
            err.push('Password must be minimum length of 8 characters');
        }
        return err;
    }

    const handleFormSubmit = async e => {
        e.preventDefault();
        const err = checkPasswordStrength(password, confirmPassword);

        if (err.length > 0) {
            setErrors(err);
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName, phone });

            resetForm();
            props.history.push('/');
        } catch (err) {
            console.error(err);
        }
    }

    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    };

    const configAuthWrapper = {
        headline: 'Signup'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (<li key={index}> {err} </li>)
                        })}
                    </ul>
                )}
                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={e => setDisplayName(e.target.value)}
                        required
                    />

                    <FormInput
                        type="text"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                        required
                    />

                    <FormInput
                        type="phone"
                        name="phone"
                        value={phone}
                        placeholder="Phone"
                        handleChange={e => setPhone(e.target.value)}
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

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button type="submit">
                        Register
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    );
}

export default withRouter(SignupComponent);
