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

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        const id = uuidv4()
        await callQuery('create', { id, firstName: form.firstName, stateOfResidence: form.stateOfResidence })
        setUsers([...users, { ...form, id }])
        setForm({
            firstName: '',
            stateOfResidence: ''
        })
    }

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
            <Button type="submit" text="Add User" />
            <Button text="Cancel" onClick={handleCancelAddUser} />
        </form>
    )
}

export default NewUser
