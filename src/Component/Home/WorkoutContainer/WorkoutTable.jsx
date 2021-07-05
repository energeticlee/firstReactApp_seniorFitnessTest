import style from '../Home.module.css'

const WorkoutTable = ({ exercise, workoutInfo }) => {
    return (
        <div>
            {workoutInfo.format !== undefined ?
                <table>
                    <thead className={style.tableHead}>
                        <tr><td colSpan="12">{workoutInfo.format}</td></tr>
                        <tr><td colSpan="12">{workoutInfo.challenge}</td></tr>
                    </thead>
                    <tbody className={style.tableBody}>
                        <tr>
                            {exercise.map((a, i) => (
                                <td className={style.tableData} key={i}>{a}</td>
                            ))}
                        </tr>
                    </tbody>
                </table> : null}
        </div>
    )
}

export default WorkoutTable
