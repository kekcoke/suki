import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';

import { auth } from './../../firebase/utils';

const EmailPassword = props => {
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const config = {
                url: 'http://localhost:3000/login'
            };

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    setResponse(['If the email matches our records, check your email for reset instructions. You will be redirected shortly.']);
                    setTimeout(() => props.history.push('/login'), 2000);
                })
                .catch(() => {
                    setResponse(['Oops. Something went wrong. Contact us if the issue persists.']);
                });
        } catch (err) {
            console.error(err);
        }
    }

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
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={e => setEmail(e.target.value)}
                    required
                />

                <Button>
                    Email Password
                </Button>

            </form>
        </AuthWrapper>
    );
}

export default withRouter(EmailPassword);
