import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Button from './Button'
import Input from './Input'
import { callQuery } from '../utils/helpers'

const NewUser = ({ setUsers, users, setShowAddUser }) => {
    const [form, setForm] = useState({
        firstName: '',
        stateOfResidence: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()

        // validate fields
        if (form.firstName === '' || form.stateOfResidence === '') {
            alert('Please fill in all fields')
        } else if (form.stateOfResidence.length !== 2) {
            alert('State of residence should be two characters')
        } else {
            setLoading(true)
            // generate new id
            const id = uuidv4()
            // send new user to DB
            await callQuery('create', { id, firstName: form.firstName.toLowerCase(), stateOfResidence: form.stateOfResidence })
            // add to current state
            setUsers([...users, { ...form, id }])
            // reset form fields
            setForm({
                firstName: '',
                stateOfResidence: ''
            })
            setLoading(false)
            setShowAddUser(false)

        }
    }

    // handles cloasing addUser form by reseting form
    const handleCancelAddUser = () => {
        setForm({
            firstName: '',
            stateOfResidence: ''
        })
        setShowAddUser(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={form.firstName} />
            <Input
                type="text"
                placeholder="State of residence (ex. MI)"
                name="stateOfResidence"
                onChange={handleChange}
                value={form.stateOfResidence} />
            <div className='center-div'>
                <Button type="submit" text="Add User" loading={loading} />
                <Button text="Cancel" onClick={handleCancelAddUser} />
            </div>
        </form>
    )
}

export default NewUser
