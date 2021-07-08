import React, { useState } from 'react'
import { useAuth } from './Contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import style from './Login.module.css'

const MyAccount = () => {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleLogout = async () => {
        setError("")

        try {
            await logout()
            history.push('/login')
        }
        catch {
            setError("Failed to log out")
        }
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.container}>
                <h1>
                    Profile
                </h1>
                <div className={style.profile}>
                    <strong>Email</strong> {currentUser.email}
                    {error}
                </div>
                <div style={{ display: "flex" }}>
                    <button className={style.button} onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default MyAccount
