import React, { useState } from 'react'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import Input from './Input'
import Button from './Button'
import {
    UserPoolId,
    ClientId
} from '../utils/amplify'

const SignUp = ({ setLoggedIn, setShowSignUp, loading, setLoading }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const poolData = {
        UserPoolId,
        ClientId
    }

    const userPool = new CognitoUserPool(poolData)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()

        // validate form filled out
        if (form.email === '' || form.password === '') {
            alert('Please fill in all fields')
        } else {
            setLoading(true)
            // call cognito to sign user up
            userPool.signUp(form.email, form.password, [], null, (err, data) => {
                if (err) {
                    setLoading(false)
                    alert(err.message)
                    return
                }
                setLoggedIn(true)
                setShowSignUp(false)
                sessionStorage.setItem('loggedIn', 'true')
                setForm({
                    email: '',
                    password: ''
                })
                setLoading(false)
            })
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
                <Button text='Sign Up' type='submit' loading={loading} />
                <Button text='Cancel' onClick={() => setShowSignUp(false)} />
            </div>
        </form>
    )
}

export default SignUp
