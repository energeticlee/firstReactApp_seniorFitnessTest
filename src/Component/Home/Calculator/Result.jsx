// BMI, FFMI
// BMR x AF = TDEE

// Target BF%
// Target Weight
// Recommended Weight
// Line Chart

import style from './Calculator.module.css'

const BMI = (height, weight) => {
    return Math.round((weight / ((height / 100) ** 2)) * 100) / 100
}

const FFMI = (height, weight, bodyFat) => {
    const FFM = weight * (1 - (bodyFat / 100))
    console.log(FFM)
    const nonFFMI = FFM / ((height / 100) ** 2)
    console.log(nonFFMI)
    return Math.round((nonFFMI + 6.1 * (1.8 - height / 100)) * 100) / 100
}

const BMR = (height, weight, age, gender) => {
    if (gender === "Male") {
        return Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5)
    } else {
        return Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161)
    }
}

const TDEE = (height, weight, age, gender, activityFactor) => {
    let bmr = 0

    if (gender === "Male") {
        return Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5)
    } else {
        return Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161)
    }
    return Math.round(bmr * activityFactor)
}

const Result = ({ bodyStats }) => {
    return (
        <div className={style.result}>
            <div>
                <p>Height: {bodyStats.height}</p>
                <p>Weight: {bodyStats.weight}</p>
                <p>Estimated Body Fat: {bodyStats.bodyFat}</p>
            </div>

            <div>Result</div>

            <div>
                <p>BMI: {BMI(bodyStats.height, bodyStats.weight)}</p>
                <p>FFMI: {bodyStats.bodyFat > 5 ? FFMI(bodyStats.height, bodyStats.weight, bodyStats.bodyFat) : "*Body Fat Input Required*"}</p>
                {/* <p>BMR: {bodyStats.age > 18 ? BMR(bodyStats.height, bodyStats.weight, bodyStats.age, bodyStats.gender) : "*Age and Gender Input Required*"}</p>
                <p>TDEE: {bodyStats.activityFactor > 1 ? TDEE(bodyStats.height, bodyStats.weight, bodyStats.age, bodyStats.gender, bodyStats.activityFactor) : "*Activity Input Required*"}</p> */}
            </div>
            <p>Recommendation</p>
            <p>Weight</p>

            <p>Roadmap to goal</p>
            <p>Daily Calories Intake</p>
            <p>Type of Training</p>
        </div>
    )
}

export default Result
