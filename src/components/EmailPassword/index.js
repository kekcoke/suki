import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import { resetAllAuthForms, resetPassword } from '../../redux/User/user.actions';
import AuthWrapper from './../AuthWrapper';
import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
});

const EmailPassword = props => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetAllAuthForms());
            props.history.push('/login')
        }
    }, [resetPasswordSuccess]);

    useEffect(() => { 
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setResponse(resetPasswordError);
        }
    }, [resetPasswordError]);

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(resetPassword({ email }));
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
