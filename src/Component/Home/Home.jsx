import React, { createContext } from 'react'
import { WorkoutTemplateData } from '../WorkoutTemplateData'
import WorkoutContainer from './WorkoutContainer/WorkoutContainer'

export const TemplateDatabase = createContext()

const Home = () => {

    //workout title
    //workout format
    //workout api by sheet

    return (
        <div>
            <TemplateDatabase.Provider value={WorkoutTemplateData}>
                {WorkoutTemplateData.map((a, i) => (
                    <WorkoutContainer key={i} workoutInfo={a} />))}
            </TemplateDatabase.Provider>
        </div>
    )
}

export default Home
