import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import { useSelector } from 'react-redux';
import { signUpUserStart } from './../../redux/User/user.actions';
import AuthWrapper from './../AuthWrapper';
import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const SignupComponent = props => {
    const { currentUser, userErr } = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentUser) {
            resetForm();
            props.history.push('/');
        }
    }, [currentUser]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        dispatch(signUpUserStart(
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
