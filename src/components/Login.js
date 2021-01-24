import React, { useState } from 'react'
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global'
import Input from './Input'
import Button from './Button'
import {
    UserPoolId,
    ClientId,
    region,
    IdentityPoolId,
} from '../utils/amplify'

const Login = ({ setLoggedIn, setShowLogin }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const poolData = {
        UserPoolId,
        ClientId
    }

    const userPool = new CognitoUserPool(poolData)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()

        // validate form is filled out
        if (form.email === '' || form.password === '') {
            alert('Please fill in all fields')
        } else {
            setLoading(true)
            // call cognito to log user in
            const authenticationDetails = new AuthenticationDetails({
                Username: form.email,
                Password: form.password
            })

            const userData = {
                Username: form.email,
                Pool: userPool,
            }

            const cognitoUser = new CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    var accessToken = result.getAccessToken().getJwtToken();

                    AWS.config.region = region;

                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId,
                        Logins: {
                            'cognito-idp.us-east-2.amazonaws.com/us-east-2_xi7hLKpHp': result
                                .getIdToken()
                                .getJwtToken(),
                        },
                    });

                    AWS.config.credentials.refresh(error => {
                        if (error) {
                            console.error(error);
                        } else {
                            sessionStorage.setItem('loggedIn', 'true');
                            setLoggedIn(true)
                            setShowLogin(false)
                        }
                    });
                    setLoading(false)
                },

                onFailure: function (err) {
                    setLoading(false)
                    if (err.message === 'User is not confirmed.') {
                        alert('Please click the link in you mailbox to confirm your account')
                    } else {
                        alert(err.message || JSON.stringify(err));
                    }
                },
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder='Email'
                onChange={handleChange}
                name='email'
                type='text'
                value={form.email} />
            <Input
                placeholder='Password'
                onChange={handleChange}
                name='password'
                type='password'
                value={form.password} />
            <div className='center-div'>
                <Button text='Login' type='submit' loading={loading} />
                <Button text='Cancel' onClick={() => setShowLogin(false)} />
            </div>
        </form>
    )
}

export default Login

