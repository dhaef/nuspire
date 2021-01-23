import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import { callQuery } from '../utils/helpers'

const EditUser = ({ user, setEdit, setUsers, users }) => {
    const [form, setForm] = useState(user);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        // Send new update to DB
        await callQuery('update', { userId: form.id, firstName: form.firstName, stateOfResidence: form.stateOfResidence })

        // Add update to current state
        setUsers(users.map(user => {
            if (user.id === form.id) {
                return {
                    id: form.id,
                    firstName: form.firstName,
                    stateOfResidence: form.stateOfResidence
                }
            }
            return user
        }))

        // Clear form and edit objects
        const editObj = {
            id: '',
            firstName: '',
            stateOfResidence: '',
            show: false
        }
        setForm(editObj)
        setEdit(editObj)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="firstName..."
                name="firstName"
                onChange={handleChange}
                value={form.firstName} />
            <Input
                type="text"
                placeholder="state of residence..."
                name="stateOfResidence"
                onChange={handleChange}
                value={form.stateOfResidence} />
            <Button type="submit" text="Update User" />
            <Button text="Cancel" onClick={() => setEdit({
                id: '',
                firstName: '',
                stateOfResidence: '',
                show: false
            })} />
        </form>
    )
}

export default EditUser
