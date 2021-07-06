import calculateAngle from "./calculateAngle"

const renderJointAngle = (jointCoordinate, confidenceScore, reducerPackage) => {

    const { dispatch, actions } = reducerPackage

    //! Elbow
    const currentElblowAngle = calculateAngle(jointCoordinate.rightShoulder, jointCoordinate.rightElbow, jointCoordinate.rightWrist, confidenceScore)

    //! Shoulder
    const currentShoulderAngle = calculateAngle(jointCoordinate.rightElbow, jointCoordinate.rightShoulder, jointCoordinate.rightHip, confidenceScore)

    //! Knee
    const currentKneeAngle = calculateAngle(jointCoordinate.rightHip, jointCoordinate.rightKnee, jointCoordinate.rightAnkle, confidenceScore)

    //! Hip
    const currentHipAngle = calculateAngle(jointCoordinate.rightShoulder, jointCoordinate.rightHip, jointCoordinate.rightKnee, confidenceScore)

    dispatch({ type: actions.setElbowAngle, payload: currentElblowAngle })
    dispatch({ type: actions.setShoulderAngle, payload: currentShoulderAngle })
    dispatch({ type: actions.setKneeAngle, payload: currentKneeAngle })
    dispatch({ type: actions.setHipAngle, payload: currentHipAngle })
}

export default renderJointAngle
