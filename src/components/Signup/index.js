import React, { Component } from 'react';
import './styles.scss';
import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';

const initialState = {
    displayName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
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

    render() {
        const { displayName, email, phone, password, confirmPassword } = this.state;

        return (
            <div className="signUp">
                <div className="wrap">
                    <h2>Signup</h2>

                    <div className="formWrap">
                        <form>
                            <FormInput
                                type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Full name"
                                onChange={this.handleChange}
                            />

                            <FormInput
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={this.handleChange}
                            />

                            <FormInput
                                type="phone"
                                name="phone"
                                value={phone}
                                placeholder="Phone"
                                onChange={this.handleChange}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Full name"
                                onChange={this.handleChange}
                            />

                            <FormInput
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                            />

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
