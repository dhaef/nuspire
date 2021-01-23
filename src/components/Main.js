import React, { useEffect, useState } from 'react'
import NewUser from './NewUser'
import EditUser from './EditUser'
import Button from './Button'
import { callQuery } from '../utils/helpers'
import styled from 'styled-components'
import SignUp from './SignUp'
import Login from './Login'

const H2 = styled.h2`
    margin-top: .5rem;
`

const Conatiner = styled.div`
    width: 200px;
    margin: auto;
`

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
`

const Card = styled.div`
    border: 1px solid black;
    padding: .5rem;
    border-radius: 5px;
    margin-top: .5rem;
    text-align: center;
`

const P = styled.p`
    margin-top: .5rem;
    text-align: center;
`

const Main = () => {
    const [users, setUsers] = useState([])
    const [showAddUser, setShowAddUser] = useState(false)
    const [edit, setEdit] = useState({
        id: '',
        firstName: '',
        stateOfResidence: '',
        show: false
    })
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn'))
    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    // get users from DB and set state
    const getUsers = async () => {
        const res = await callQuery('getUsers')
        setUsers(res.data.getUsers)
    }

    useEffect(() => {
        getUsers()
    }, [])

    // handle delete user item, remove from DB and state
    const handleDelete = async e => {
        const id = e.target.id
        await callQuery('delete', { userId: id })
        setUsers(users.filter(user => user.id !== id))
    }

    // handle update user item, update in DB and state
    const handleUpdate = (id, firstName, stateOfResidence) => {
        setEdit({
            id,
            firstName,
            stateOfResidence,
            show: true
        })
    }

    const handleLogout = () => {
        sessionStorage.removeItem('loggedIn')
        setLoggedIn(false)
    }

    return (
        <Conatiner>
            <H2>Nuspire Challenge</H2>
            {!loggedIn ? <>
                {showSignUp ? <SignUp setLoggedIn={setLoggedIn} setShowSignUp={setShowSignUp} /> : <Button text="Sign Up" onClick={() => setShowSignUp(true)} />}
                {showLogin ? <Login setLoggedIn={setLoggedIn} setShowLogin={setShowLogin} /> : <Button text="Login" onClick={() => setShowLogin(true)} />}
            </> : <>
                    <Button text="Logout" onClick={handleLogout} />
                    {showAddUser
                        ? <NewUser setUsers={setUsers} users={users} setShowAddUser={setShowAddUser} />
                        : <Button text="Add New User" onClick={() => setShowAddUser(true)} />}
                </>}
            {edit.show && <EditUser user={edit} setEdit={setEdit} setUsers={setUsers} users={users} />}
            <P>User Count: {users.length}</P>
            <CardContainer>
                {users && users.map(user => {
                    return <Card key={user.id}>
                        <P>First-name: {user.firstName}</P>
                        <P>Location: {user.stateOfResidence}</P>
                        {loggedIn && <>
                            <Button onClick={() => handleUpdate(user.id, user.firstName, user.stateOfResidence)} id={user.id} text="Update" />
                            <Button onClick={handleDelete} id={user.id} text="Delete" />
                        </>}
                    </Card>
                })}
            </CardContainer>
        </Conatiner>
    )
}

export default Main
