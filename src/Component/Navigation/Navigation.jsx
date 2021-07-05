import React from 'react'
import { Link, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Calculator from '../Home/Calculator/Calculator'
import DarkMode from './DarkMode'
import FitnessTest from "../Home/Testing/FitnessTest"
import style, { item } from "./Nav.module.css"

const Navigation = () => {

    const navStyle = { textDecoration: 'none', color: "white" }

    return (
        <div>
            <nav className={style.navBar}>
                <div className={style.leftNav}>
                    <div className={item}>
                        <Link to="/" style={navStyle}>
                            <p className={item}>Home</p>
                        </Link>
                    </div>
                    <div className={`${style.subLeftNav} ${item}`}>
                        <Link to="calculator" style={navStyle}>
                            <p className={item}>Calculator</p>
                        </Link>
                    </div>
                    <div className={`${style.subLeftNav} ${item}`}>
                        <Link to="fitness-test" style={navStyle}>
                            <p className={item}>Fitness Testing</p>
                        </Link>
                    </div>
                </div>
                <div className={item}>
                    DarkMode
                    <DarkMode />
                </div>
            </nav>
            <main>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/calculator">
                    <Calculator />
                </Route>
                <Route path="/fitness-test">
                    <FitnessTest />
                </Route>
            </main>
        </div>
    )
}

export default Navigation
