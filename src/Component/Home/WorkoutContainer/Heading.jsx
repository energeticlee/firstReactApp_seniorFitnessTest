import React from 'react'
import style from './Home.module.css';

const Heading = ({ clickHandler, workoutInfo }) => {

    return (
        <div className={style.heading}>
            <h2 className={style.title}>{workoutInfo.title}</h2>
            <button className={style.button} onClick={clickHandler}>Generate Workout</button>
        </div>
    )
}

export default Heading
