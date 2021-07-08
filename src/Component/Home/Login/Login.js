import React, { useRef, useState } from 'react'
import { useAuth } from './Contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import style from './Login.module.css'

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.container}>
                <h1>
                    Log In
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
                    <button className={style.button} disable={loading} type="submit">Log In</button>
                </form>
                <div className={style.buttomLink}>
                    Need an account?<Link to="/signup" style={{ marginLeft: "5px" }}>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
