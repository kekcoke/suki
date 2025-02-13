import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetPasswordStart, resetUserState } from '../../redux/User/user.actions';
import AuthWrapper from './../AuthWrapper';
import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';
import './styles.scss';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = props => {
    const history = useHistory();
    const { resetPasswordSuccess, userErr } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/login')
        }
    }, [resetPasswordSuccess]);

    useEffect(() => { 
        if (Array.isArray(userErr) && userErr.length > 0) {
            setResponse(userErr);
        }
    }, [userErr]);

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(resetPasswordStart({ email }));
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

export default EmailPassword;
