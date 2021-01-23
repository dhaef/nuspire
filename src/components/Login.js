import React, { useState } from 'react'
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global'
import Input from './Input'
import Button from './Button'

const Login = ({ setLoggedIn, setShowLogin }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const poolData = {
        UserPoolId: 'us-east-2_xi7hLKpHp',
        ClientId: '3oipmen0d58bnok6fm5igprqov'
    }

    const userPool = new CognitoUserPool(poolData)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()
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

                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                AWS.config.region = 'eu-west-1';

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'eu-west-1:a1564b96-eeef-4f38-84e1-33a0d2f50ab6', // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.us-east-2.amazonaws.com/us-east-2_xi7hLKpHp': result
                            .getIdToken()
                            .getJwtToken(),
                    },
                });

                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                AWS.config.credentials.refresh(error => {
                    if (error) {
                        console.error(error);
                    } else {
                        // Instantiate aws sdk service objects now that the credentials have been updated.
                        // example: var s3 = new AWS.S3();
                        console.log('Successfully logged!');
                        sessionStorage.setItem('loggedIn', 'true');
                        setLoggedIn(true)
                        setShowLogin(false)
                    }
                });
            },

            onFailure: function (err) {
                alert(err.message || JSON.stringify(err));
            },
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder='email'
                onChange={handleChange}
                name='email'
                type='text'
                value={form.email} />
            <Input
                placeholder='password'
                onChange={handleChange}
                name='password'
                type='password'
                value={form.password} />
            <Button text='Login' type='submit' />
            <Button text='Cancel' onClick={() => setShowLogin(false)} />
        </form>
    )
}

export default Login

