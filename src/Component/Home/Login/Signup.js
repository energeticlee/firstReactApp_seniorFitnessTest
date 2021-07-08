import React, { useRef, useState } from 'react'
import { useAuth } from './Contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"
import style from './Login.module.css'

const Signup = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.container}>
                <h1>
                    Sign Up
                </h1>
                <h1>
                    {error}</h1>
                <form className={style.form} onSubmit={handleSubmit}>
                    <label className={style.itemInForm}>Email
                        <input className={style.input} type="email" name="email" ref={emailRef} required />
                    </label>
                    <label>Password
                        <input className={style.input} type="Password" name="Password" ref={passwordRef} required />
                    </label>
                    <button className={style.button} disable={loading} type="submit">Sign Up</button>
                </form>
                <div className={style.buttomLink}>
                    Alright have an account? <Link to="/login">Log In</Link>
                </div>
            </div >
        </div >
    )
}

export default Signup
