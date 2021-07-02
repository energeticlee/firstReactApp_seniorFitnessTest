import React, { useState, useEffect } from 'react'
import Heading from "./WorkoutContainer/Heading"
import Tabletop from "tabletop";


const WorkoutContainer = () => {
    const [exercise, setExercise] = useState([]);
    const [toggle, setToggle] = useState(true)

    const flipToggle = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
        Tabletop.init({
            key: process.env.REACT_APP_SHEET_ID,
            simpleSheet: true
        })
            .then((data) => callWorkoutRoutine(data))
            .catch((err) => console.warn(err));

    }, [toggle]);

    const shuffleArray = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    const callWorkoutRoutine = (data) => {
        const workoutFlow = ["Push", "Lunge", "Squat", "Cardio", "Abs", "Back"]
        const workoutRoutine = []
        const arr = [...Array(data.length).keys()]

        for (let part of workoutFlow) {
            shuffleArray(arr)
            workoutRoutine.push(data[arr[0]][part], data[arr[1]][part])
        }
        shuffleArray(workoutRoutine)
        setExercise(workoutRoutine)
        console.log(workoutRoutine)
    }

    return (
        <div>
            <Heading clickHandler={flipToggle} />
        </div>
    )
}

export default WorkoutContainer
