import React, { Component } from 'react';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';

import { auth } from './../../firebase/utils';

const initialState = {
    email: ''
};

class EmailPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email } = this.state;
            const config = {
                url: 'https://localhost:3000/login'
            };

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    alert('Password Reset');
                })
                .catch(() => {
                    alert('Something went wrong');
                });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { email } = this.state;
        const configAuthWrapper = {
            headline: 'Email Password'
        };

        return (
            <AuthWrapper {...configAuthWrapper}>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange}
                    />

                    <Button>
                        Email Password
                    </Button>

                </form>
            </AuthWrapper>
        );
    }
}

export default EmailPassword;
