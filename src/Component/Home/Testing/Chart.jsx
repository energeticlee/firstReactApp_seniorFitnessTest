const Chart = ({ repPhase, kneeAngle, repCount, result, hipAngle, elbowAngle, setRepCount }) => {
    return (
        <div>
            <table style={{ fontSize: "4rem" }}>
                <tr><td>Current Phase: {repPhase}</td></tr>
                <tr><td>Rep Count: {repCount}</td></tr>
                <tr><td>Result (s): {result}</td></tr>
                {/* <tr><td>Knee angle: {kneeAngle}</td></tr> */}
                {/* <tr><td>Hip Angle: {hipAngle}</td></tr> */}
                <tr><td>Elbow Angle: {elbowAngle}</td></tr>
            </table>
            <button onClick={() => setRepCount(x => x = 0)}>setRepCount</button>
        </div>
    )
}

export default Chart
