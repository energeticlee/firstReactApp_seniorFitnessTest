import { useEffect } from "react"

const BicepCurl = (reducerPackage) => {

    const { state, actions, dispatch } = reducerPackage

    const bicepCurlCounter = () => {
        if (state.elbowAngle > 150) {
            dispatch({ type: actions.setRepPhase, payload: "down" })
            if (state.repCount === 0) dispatch({ type: actions.setStartTime, payload: Date.now() })
        }

        if (state.elbowAngle < 40 && state.repPhase === "down") {
            dispatch({ type: actions.setRepPhase, payload: "up" })
            dispatch({ type: actions.setRepCount, payload: 1 })
        }
        if (state.repCount === 5) {
            dispatch({ type: actions.setEndTime, payload: Date.now() })
            dispatch({ type: actions.setRepCount, payload: 0 })
        }
    }

    const testResult = (state) => {
        dispatch({ type: actions.setResult, payload: ((state.endTime - state.startTime) / 1000).toFixed(1) })
    }

    useEffect(() => {
        if (state.elbowAngle > 10) bicepCurlCounter(state.elbowAngle)
    }, [state.elbowAngle]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (state.elbowAngle > 10) testResult(state)
    }, [state.endTime]) // eslint-disable-line react-hooks/exhaustive-deps

}

export default BicepCurl
