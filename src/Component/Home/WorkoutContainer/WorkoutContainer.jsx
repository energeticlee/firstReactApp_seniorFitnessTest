import React, { useState } from 'react'
import Heading from "./Heading"
import Tabletop from "tabletop";
import WorkoutTable from './WorkoutTable'
import style from '../Home.module.css'


const WorkoutContainer = ({ workoutInfo }) => {
    const [exercise, setExercise] = useState([])

    const shuffleArray = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    const callWorkoutRoutine = () => {

        Tabletop.init({
            key: workoutInfo.key,
            simpleSheet: true
        })
            .then((data) => workoutDesign(data))
            .catch((err) => console.warn(err));
    }

    const workoutDesign = (data) => {
        const workoutRoutine = []
        const arr = [...Array(data.length).keys()]

        for (let part of workoutInfo.workoutFlow) {
            shuffleArray(arr)
            workoutRoutine.push(data[arr[0]][part], data[arr[1]][part])
        }
        shuffleArray(workoutRoutine)
        setExercise(workoutRoutine)
        console.log(workoutRoutine)
    }

    return (
        <div className={style.homeContainer}>
            <Heading clickHandler={callWorkoutRoutine} workoutInfo={workoutInfo} />
            <WorkoutTable exercise={exercise} workoutInfo={workoutInfo} />
        </div>
    )
}

export default WorkoutContainer