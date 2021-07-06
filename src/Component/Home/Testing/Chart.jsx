const Chart = ({ reducerPackage }) => {

    const { state, actions, dispatch } = reducerPackage

    return (
        <div>
            <table style={{ fontSize: "4rem" }}>
                <tr><td>Current Phase: {state.repPhase}</td></tr>
                <tr><td>Rep Count: {state.repCount}</td></tr>
                <tr><td>Result (s): {state.result}</td></tr>
            </table>
            <button onClick={() => dispatch({ type: actions.setRepCount, payload: 0 })}>setRepCount</button>
        </div>
    )
}

export default Chart
