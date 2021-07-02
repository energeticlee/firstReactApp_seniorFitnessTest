import React from 'react'

const Heading = ({ clickHandler }) => {

    return (
        <div>
            <img src="" alt="Icon" />
            <title>7min Workout</title>
            <button onClick={clickHandler}>Generate Workout</button>
        </div>
    )
}

export default Heading
