// Input = Height, Weight, Gender, Current BF% (Picture referrence)

import Result from './Result'
import React, { useReducer, useState } from "react"

const ACTIONS = { HEIGHT: "height", WEIGHT: "weight", GENDER: "gender", BODYFAT: "bodyFat" }

const randerStats = (bodyStats, action) => {
    console.log(bodyStats)
    switch (action.type) {
        case ACTIONS.HEIGHT:
            return { ...bodyStats, [ACTIONS.HEIGHT]: action.payload }

        case ACTIONS.WEIGHT:
            return { ...bodyStats, [ACTIONS.WEIGHT]: action.payload }

        case ACTIONS.GENDER:
            return { ...bodyStats, [ACTIONS.GENDER]: action.payload }

        case ACTIONS.BODYFAT:
            return { ...bodyStats, [ACTIONS.BODYFAT]: action.payload }
    }
}

const Calculator = () => {
    const [bodyStats, dispatch] = useReducer(randerStats, {})

    return (
        <div>
            <div>
                <label>Height</label>
                <input onChange={e => dispatch({ type: ACTIONS.HEIGHT, payload: e.target.value })} type="number"
                    min="135" max="210" /> cm
            </div>
            <div>
                <label>Weight</label>
                <input onChange={e => dispatch({ type: ACTIONS.WEIGHT, payload: e.target.value })} type="number"
                    min="45" max="130" /> kg
            </div>
            <div>
                <label>Gender</label>
                <select onChange={e => dispatch({ type: ACTIONS.GENDER, payload: e.target.value })}>
                    <option value="" />
                    <option value="Male">Male</option>
                    <option value="Female">female</option>
                </select>
            </div>
            <div>
                <label>Estimated Body Fat (Optional)</label>
                <input onChange={e => dispatch({ type: ACTIONS.BODYFAT, payload: e.target.value })} type="number"
                    min="5" max="40" /> %
            </div>
            <Result bodyStats={bodyStats} />
        </div>
    )
}

export default Calculator
