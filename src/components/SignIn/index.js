import React from 'react';
import './styles.scss';
import Button from './../../components/Forms/Button';

const SignIn = props => {
    return (
        <div className="signIn">
            <div className="wrap">
                <h2>
                    Login
                </h2>

                <div className="formWrap">
                    <form>
                        <div className="socialSignIn">
                            <div className="row">
                                <Button>
                                    Sign in with Google
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
