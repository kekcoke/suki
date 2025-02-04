import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import { useDispatch, useSelector } from 'react-redux';
import { resetAllAuthForms, signUpUser } from './../../redux/User/user.actions';
import AuthWrapper from './../AuthWrapper';
import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
});

const SignupComponent = props => {
    const { signUpSuccess, signUpError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (signUpSuccess) {
            resetForm();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    }, [signUpSuccess]);

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
            setErrors(signUpError);
        }
    }, [signUpError]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        dispatch(signUpUser(
        { 
            displayName, 
            email,
            phone,
            password,
            confirmPassword 
        }));
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
