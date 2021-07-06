// Input = height, weight, gender, Current BF% (Picture referrence)

import Result from './Result'
import { useReducer } from "react"
import style from './Calculator.module.css'

const actions = { age: "age", height: "height", weight: "weight", gender: "gender", activityFactor: "activityFactor", bodyFat: "bodyFat" }

const randerStats = (bodyStats, action) => {
    console.log(bodyStats)
    switch (action.type) {
        case actions.age:
            return { ...bodyStats, age: action.payload }

        case actions.height:
            return { ...bodyStats, height: action.payload }

        case actions.weight:
            return { ...bodyStats, weight: action.payload }

        case actions.gender:
            return { ...bodyStats, gender: action.payload }

        case actions.bodyFat:
            return { ...bodyStats, bodyFat: action.payload }

        case actions.activityFactor:
            return { ...bodyStats, activityFactor: action.payload }

        default:
            return bodyStats
    }
}


const Calculator = () => {
    const [bodyStats, dispatch] = useReducer(randerStats, {})
    const renderPackage = [bodyStats, dispatch, actions]

    return (
        <div className={style.result}>
            <div>
                <label style={{ margin: "20px" }}>Age</label>
                <input onChange={e => dispatch({ type: actions.age, payload: e.target.value })} type="number"
                    min="16" max="100" /> Years old
            </div>
            <div>
                <label style={{ margin: "20px" }}>Height</label>
                <input onChange={e => dispatch({ type: actions.height, payload: e.target.value })} type="number"
                    min="135" max="210" /> cm
            </div>
            <div>
                <label style={{ margin: "20px" }}>Weight</label>
                <input onChange={e => dispatch({ type: actions.weight, payload: e.target.value })} type="number"
                    min="45" max="130" /> kg
            </div>
            <div>
                <label style={{ margin: "20px" }}>Gender</label>
                <select onChange={e => dispatch({ type: actions.gender, payload: e.target.value })}>
                    <option value="" />
                    <option value="Male">Male</option>
                    <option value="Female">female</option>
                </select>
            </div>
            <div>
                <label style={{ margin: "20px" }}>Activity Factor (Optional)</label>
                <select onChange={e => dispatch({ type: actions.activityFactor, payload: e.target.value })}>
                    <option value="" />
                    <option value={1.2}>Sedentary (Little to no exercise)</option>
                    <option value={1.3}>Light exercise (1-3 days per week)</option>
                    <option value={1.5}>Moderate exercise (3-5 days per week)</option>
                    <option value={1.7}>Heavy exercise (6-7 days per week)</option>
                    <option value={1.9}>Very heavy exercise (twice per day, extra heavy workouts)</option>
                </select>
            </div>
            <div>
                <label style={{ margin: "20px" }}>Estimated Body Fat (Optional)</label>
                <input onChange={e => dispatch({ type: actions.bodyFat, payload: e.target.value })} type="number"
                    min="5" max="40" /> %
            </div>
            <Result renderPackage={renderPackage} />
        </div>
    )
}

export default Calculator
