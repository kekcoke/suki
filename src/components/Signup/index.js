import React, { Component } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from './../../firebase/utils';

import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';
import Address from './../Address';

const initialState = {
    displayName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: {
        name: '',
        address: '',
        secondaryAddress: '',
        cityTown: '',
        regionStateProvince: '',
        postalCode: '',
        country: '',
        googleMapLink: ''
    },
    errors: []
};

class SignupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = async e => {
        e.preventDefault();
        const { displayName, email, phone, password, confirmPassword, address } = this.state;
        const err = this.checkPasswordStrength(password, confirmPassword);
        if (err.length > 0) {
            this.setState({ errors: err });
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName, phone, address });

            this.setState({
                ...initialState
            });
        } catch (err) {
            console.error(err);
        }
    }

    checkPasswordStrength(password, confirmPassword) {
        const err = [];
        if (password !== confirmPassword) {
            err.push('Passwords don\'t Match');
        }
        if (String(password).length < 8) {
            err.push('Password must be minimum length of 8 characters');
        }
        return err;
    }

    render() {
        const { displayName, email, phone, password, confirmPassword, errors, address } = this.state;

        return (
            <div className="signUp">
                <div className="wrap">
                    <h2>Signup</h2>
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return(<li key={index}> {err} </li>)
                            })}
                        </ul>
                    )}
                    <div className="formWrap">
                        <form onSubmit={this.handleFormSubmit}>
                            <FormInput
                                type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Full name"
                                onChange={this.handleChange}
                                required
                            />

                            <FormInput
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={this.handleChange}
                                required
                            />

                            <FormInput
                                type="phone"
                                name="phone"
                                value={phone}
                                placeholder="Phone"
                                onChange={this.handleChange}
                                required
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handleChange}
                                required
                            />

                            <FormInput
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                                required
                            />
                            <h3>
                                Address
                            </h3>
                            <p> Enter your address. You can also enter your address from your profile or during checkout. </p>
                            <Address address={address} required={false} onChange={this.handleChange}/>
                            <Button type="submit">
                                Register
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupComponent;
