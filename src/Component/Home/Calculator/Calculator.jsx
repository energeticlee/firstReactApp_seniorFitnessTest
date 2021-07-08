import { useReducer, createContext } from "react"
import { WorkoutTemplateData } from '../../WorkoutTemplateData'
import Result from './Result'
import WorkoutContainer from '../WorkoutContainer/WorkoutContainer'
import style from './Calculator.module.css'

export const TemplateDatabase = createContext()
const actions = { age: "age", height: "height", weight: "weight", gender: "gender", activityFactor: "activityFactor", bodyFat: "bodyFat" }

const randerStats = (bodyStats, action) => {
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
        <div>
            <div className={style.mainContainer}>
                <div className={style.inputSection}>
                    <div className={style.inputHead}>Input Data</div>
                    <div className={style.inputContainer}>
                        <label>Age</label>
                        <div className={style.input}>
                            <input className={style.form} onChange={e => dispatch({ type: actions.age, payload: e.target.value })} type="number"
                                min="16" max="100" /> Years old
                        </div>
                    </div>
                    <div className={style.inputContainer}>
                        <label>Height</label>
                        <div className={style.input}>
                            <input className={style.form} onChange={e => dispatch({ type: actions.height, payload: e.target.value })} type="number"
                                min="135" max="210" /> cm
                        </div>
                    </div>
                    <div className={style.inputContainer}>
                        <label>Weight</label>
                        <div className={style.input}>
                            <input className={style.form} onChange={e => dispatch({ type: actions.weight, payload: e.target.value })} type="number"
                                min="45" max="130" /> kg
                        </div>
                    </div>
                    <div className={style.inputContainer}>
                        <label>Gender</label>
                        <div className={style.input}>
                            <select className={style.form} onChange={e => dispatch({ type: actions.gender, payload: e.target.value })}>
                                <option value="" />
                                <option value="Male">Male</option>
                                <option value="Female">female</option>
                            </select>
                        </div>
                    </div>
                    <div className={style.inputContainer} style={{ padding: "20px 10px" }}>
                        <label>Activity Factor (Optional)</label>
                        <select className={style.form} onChange={e => dispatch({ type: actions.activityFactor, payload: e.target.value })}>
                            <option value="" />
                            <option value={1.2}>Sedentary (Little to no exercise)</option>
                            <option value={1.3}>Light exercise (1-3 days per week)</option>
                            <option value={1.5}>Moderate exercise (3-5 days per week)</option>
                            <option value={1.7}>Heavy exercise (6-7 days per week)</option>
                            <option value={1.9}>Very heavy exercise (twice per day, extra heavy workouts)</option>
                        </select>
                    </div>
                    <div className={style.inputContainer}>
                        <label>Estimated Body Fat (Optional)</label>
                        <div className={style.input}>
                            <input className={style.form} onChange={e => dispatch({ type: actions.bodyFat, payload: e.target.value })} type="number"
                                min="5" max="40" /> %
                        </div>
                    </div>
                </div>
                <div>
                    <Result renderPackage={renderPackage} />
                </div>
            </div>
            <div>
                <TemplateDatabase.Provider value={WorkoutTemplateData}>
                    {WorkoutTemplateData.map((a, i) => (
                        <WorkoutContainer key={i} workoutInfo={a} />))}
                </TemplateDatabase.Provider>
            </div>
        </div>
    )
}

export default Calculator
