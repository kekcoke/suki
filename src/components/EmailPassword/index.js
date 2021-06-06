import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';

import { auth } from './../../firebase/utils';

const initialState = {
    email: '',
    response: []
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
                url: 'http://localhost:3000/login'
            };

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    this.setState( { response: ['If the email matches our records, check your email for reset instructions. You will redirected shortly.'] });
                    setTimeout(() => this.props.history.push('/login'), 2000);
                })
                .catch(() => {
                    this.setState( { response: ['Oops. Something went wrong. Contact us if the issue persists.'] });
                });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { email, response } = this.state;
        const configAuthWrapper = {
            headline: 'Email Password'
        };

        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    {response.length > 0 && (
                        <ul>
                            {response.map((e, index) => <li key={index}> {e} </li>)}
                        </ul>
                    )}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={this.handleChange}
                        required
                    />

                    <Button>
                        Email Password
                    </Button>

                </form>
            </AuthWrapper>
        );
    }
}

export default withRouter(EmailPassword);
