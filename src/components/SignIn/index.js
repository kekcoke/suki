import React, { Component } from 'react';
import './styles.scss';
import Button from './../../components/Forms/Button';
import FormInput from './../Forms/FormInput';
import AuthWrapper from './../AuthWrapper';

import { signInWithGoogle, auth } from './../../firebase/utils';
import { Link } from 'react-router-dom';

const initialState = {
    email: '',
    password: ''
};

class SignIn extends Component {
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

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ ...initialState });

        } catch (e) {
            console.error(e);
        }
    }

    render() {
        const { email, password } = this.state;
        const configAuthWrapper = {
            headline: 'Login'
        };

        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={this.handleChange}
                        />
                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={this.handleChange}
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
                        <div class="links">
                            <Link to="/recovery">
                                Reset Password
                            </Link>
                        </div>
                    </form>
                </div>

            </AuthWrapper>
        )
    }
}

export default SignIn;
