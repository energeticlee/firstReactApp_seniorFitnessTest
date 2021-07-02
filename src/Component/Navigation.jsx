import React from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './Home/Home'
import Calculator from './Home/Calculator/Calculator'
import DarkMode from './DarkMode'

const Navigation = () => {
    return (
        <div>
            <nav>
                <Link to="/">
                    Home
                </Link>
                <Link to="calculator">
                    Calculator
                </Link>
                <div>
                    <DarkMode />
                </div>
            </nav>
            <main>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="calculator">
                    <Calculator />
                </Route>
            </main>
        </div>
    )
}

export default Navigation
