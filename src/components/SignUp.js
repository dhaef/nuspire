import React, { useState } from 'react'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import Input from './Input'
import Button from './Button'

const SignUp = ({ setLoggedIn, setShowSignUp }) => {
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
        userPool.signUp(form.email, form.password, [], null, (err, data) => {
            if (err) return err
            setLoggedIn(true)
            sessionStorage.setItem('loggedIn', 'true');
            setForm({
                email: '',
                password: ''
            })
        })
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
            <Button text='Sign Up' type='submit' />
            <Button text='Cancel' onClick={() => setShowSignUp(false)} />
        </form>
    )
}

export default SignUp
