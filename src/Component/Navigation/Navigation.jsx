import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Calculator from '../Home/Calculator/Calculator'
import Signup from '../Home/Login/Signup'
import FitnessTest from "../Home/Testing/FitnessTest"
import style, { item } from "./Nav.module.css"
import Login from '../Home/Login/Login'
import MyAccount from '../Home/Login/MyAccount'
import PrivateRoute from '../Home/Login/PrivateRoute'

const Navigation = () => {

    const navStyle = { textDecoration: 'none', color: "white" }

    return (
        <div>
            <nav className={style.navBar}>
                <div className={style.leftNav}>
                    <div className={style.subLeftNav}>
                        <Link to="calculator" style={navStyle}>
                            <p className={item}>Calculator</p>
                        </Link>
                    </div>
                    <div className={style.subLeftNav}>
                        <Link to="fitness-test" style={navStyle}>
                            <p className={item}>Fitness Testing</p>
                        </Link>
                    </div>
                </div>
                <div>
                    <Link to="/" style={navStyle}>
                        <p className={item}>My Account</p>
                    </Link>
                </div>
            </nav>
            <main>
                <Switch>
                    <PrivateRoute exact path="/" component={MyAccount} />
                    <Route path="/calculator" component={Calculator} />
                    <Route path="/fitness-test" component={FitnessTest} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                </Switch>
            </main>
        </div>
    )
}

export default Navigation
