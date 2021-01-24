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
    text-align: center;
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
    const [loading, setLoading] = useState(false);

    // get users from DB and set state
    const getUsers = async () => {
        setLoading(true)
        const res = await callQuery('getUsers')
        setUsers(res.data.getUsers)
        setLoading(false)
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

    // handle logout by removing session and setting state
    const handleLogout = () => {
        sessionStorage.removeItem('loggedIn')
        setLoggedIn(false)
    }

    // handle displaying show login form and hide sign up if open
    const handleShowLogin = () => {
        setShowLogin(true)
        setShowSignUp(false)
    }

    // handle displaying show sign up form and hide login if open
    const handleShowSignUp = () => {
        setShowLogin(false)
        setShowSignUp(true)
    }

    return (
        <Conatiner>
            <H2>Nuspire Challenge</H2>
            {!loggedIn ? <>
                <div className='center-div'>
                    {!showSignUp && <Button text="Sign Up" onClick={handleShowSignUp} />}
                    {!showLogin && <Button text="Login" onClick={handleShowLogin} />}
                </div>
                {showSignUp && <SignUp setLoggedIn={setLoggedIn} setShowSignUp={setShowSignUp} loading={loading} setLoading={setLoading} />}
                {showLogin && <Login setLoggedIn={setLoggedIn} setShowLogin={setShowLogin} loading={loading} setLoading={setLoading} />}
            </> : <>
                    <div className='center-div'>
                        <Button text="Logout" onClick={handleLogout} />
                        {!showAddUser && <Button text="Add New User" onClick={() => setShowAddUser(true)} />}
                    </div>
                    {showAddUser && <NewUser setUsers={setUsers} users={users} setShowAddUser={setShowAddUser} loading={loading} setLoading={setLoading} />}
                </>}
            {edit.show && <EditUser user={edit} setEdit={setEdit} setUsers={setUsers} users={users} loading={loading} setLoading={setLoading} />}
            {loading ? <P>Loading...</P>
                : <>
                    <P>User Count: {users.length}</P>
                    <CardContainer>
                        {users && users.map(user => {
                            return <Card key={user.id}>
                                <P className='capitalize'><strong>First-name:</strong> {user.firstName}</P>
                                <P><strong>Location:</strong> {user.stateOfResidence}</P>
                                {loggedIn && <>
                                    <Button onClick={() => handleUpdate(user.id, user.firstName, user.stateOfResidence)} id={user.id} text="Update" />
                                    <Button onClick={handleDelete} id={user.id} text="Delete" />
                                </>}
                            </Card>
                        })}
                    </CardContainer>
                </>}
        </Conatiner>
    )
}

export default Main
