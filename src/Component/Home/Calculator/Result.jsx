// BMI, FFMI
// BMR x AF = TDEE

// Target BF%
// Target Weight
// Recommended Weight
// Line Chart

const BMI = (bodyStats) => {
    return Math.round((bodyStats.weight / ((bodyStats.height / 100) ** 2)) * 100) / 100
}

const FFMI = (bodyStats) => {
    const FFM = bodyStats.weight * (1 - (bodyStats.bodyFat / 100))
    console.log(FFM)
    const nonFFMI = FFM / ((bodyStats.height / 100) ** 2)
    console.log(nonFFMI)
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
        <div style={{ margin: "20px" }}>
            <div>
                <p>Age: {bodyStats.age}</p>
                <p>Height: {bodyStats.height}</p>
                <p>Weight: {bodyStats.weight}</p>
                <p>Estimated Body Fat: {bodyStats.bodyFat}</p>
            </div>

            <div>Result</div>

            <div>
                <p>BMI: {BMI(bodyStats)}</p>
                <p>FFMI: {bodyStats.bodyFat > 5 ? FFMI(bodyStats) : "*Body Fat Input Required*"}</p>
                <p>BMR: {bodyStats.age > 18 ? BMR(bodyStats) : "*Age and Gender Input Required*"} Calories</p>
                <p>TDEE: {bodyStats.activityFactor > 1 ? TDEE(bodyStats) : "*Activity Input Required*"} Calories</p>
            </div>
        </div>
    )
}

export default Result
