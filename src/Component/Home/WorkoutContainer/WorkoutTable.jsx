const WorkoutTable = ({ exercise }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan="12">
                            Workout Of The Day!
                        </th>
                    </tr>
                    <tr>
                        <td colSpan="12">20 Second Work, 10 Second Rest | 6min per Round</td></tr>
                </thead>
                <tbody>
                    <tr>
                        {exercise.map((a, i) => (
                            <td key={i}>{a}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default WorkoutTable
