import React from 'react'
import style from '../Home.module.css';

const Heading = ({ clickHandler, workoutInfo }) => {

    return (
        <div className={style.heading}>
            <img src="" alt="Icon" />
            <h2>{workoutInfo.title}</h2>
            <button onClick={clickHandler}>Generate Workout</button>
        </div>
    )
}

export default Heading
