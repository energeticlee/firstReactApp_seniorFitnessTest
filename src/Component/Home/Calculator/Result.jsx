import style from './Calculator.module.css'

const BMI = (bodyStats) => {
    return Math.round((bodyStats.weight / ((bodyStats.height / 100) ** 2)) * 100) / 100
}

const FFMI = (bodyStats) => {
    const FFM = bodyStats.weight * (1 - (bodyStats.bodyFat / 100))
    const nonFFMI = FFM / ((bodyStats.height / 100) ** 2)
    return Math.round((nonFFMI + 6.1 * (1.8 - bodyStats.height / 100)) * 100) / 100
}

const BMR = (bodyStats) => {
    if (bodyStats.gender === "Male") {
        return Math.round((10 * bodyStats.weight) + (6.25 * bodyStats.height) - (5 * bodyStats.age) + 5)
    } else {
        return Math.round((10 * bodyStats.weight) + (6.25 * bodyStats.height) - (5 * bodyStats.age) - 161)
    }
}

const TDEE = (bodyStats) => {
    let bmr = 0

    if (bodyStats.gender === "Male") {
        bmr = Math.round((10 * bodyStats.weight) + (6.25 * bodyStats.height) - (5 * bodyStats.age) + 5)
    } else {
        bmr = Math.round((10 * bodyStats.weight) + (6.25 * bodyStats.height) - (5 * bodyStats.age) - 161)
    }
    return Math.round(bmr * bodyStats.activityFactor)
}

const Result = ({ renderPackage }) => {
    const [bodyStats] = renderPackage

    return (
        <div className={style.inputSection}>
            <div className={style.inputHead}>Result</div>
            <div>
                <div>
                    <div className={style.inputContainer}><p>BMI:</p> <p className={style.input}>{BMI(bodyStats) ? BMI(bodyStats) : null}</p></div>
                    <div className={style.inputContainer}><p>FFMI:</p> <p className={style.input}>{FFMI(bodyStats) ? FFMI(bodyStats) : "*Body Fat Input Required*"}</p></div>
                    <div className={style.inputContainer}><p>BMR:</p> <p className={style.input}>{BMR(bodyStats) ? BMR(bodyStats) : "*Age and Gender Input Required*"} Calories</p></div>
                    <div className={style.inputContainer}><p>TDEE:</p> <p className={style.input}>{bodyStats.activityFactor > 1 ? TDEE(bodyStats) : "*Activity Input Required*"} Calories</p></div>
                </div>
            </div>
        </div>
    )
}

export default Result
