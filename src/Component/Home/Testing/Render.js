import React, { useRef, useState, useEffect, useReducer } from 'react'
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from "react-webcam"
import style from './Render.module.css'
import calculateAngle from './calculateAngle';
import Chart from './Chart'


const Render = () => {
    const [hipAngle, setHipAngle] = useState(0)
    const [kneeAngle, setKneeAngle] = useState(0)
    const [elbowAngle, setElbowAngle] = useState(0)
    const [repCount, setRepCount] = useState(0)
    const [repPhase, setRepPhase] = useState("")
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)
    const [result, setResult] = useState(0)


    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const toggleRate = 40


    useEffect(() => {
        const init = async () => {
            const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
            const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

            const interval = setInterval(() => {
                detect(detector)
            }, toggleRate)
            return () => clearInterval(interval)
        }
        init()
    }, [])

    const detect = async (detector) => {
        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight

            // Set video width
            webcamRef.current.video.width = videoWidth
            webcamRef.current.video.height = videoHeight

            const poses = await detector.estimatePoses(video)

            drawCanvas(poses, canvasRef)
        }
    }

    const drawCanvas = (poses, canvas) => {
        const ctx = canvas.current.getContext("2d")
        canvas.current.width = webcamRef.current.video.videoWidth
        canvas.current.height = webcamRef.current.video.videoHeight

        const confidenceScore = 0.5

        const keypoint = poses[0].keypoints

        const rightShoulder = keypoint[6]
        const rightElbow = keypoint[8]
        const rightWrist = keypoint[10]
        const rightHip = keypoint[12]
        const rightKnee = keypoint[14]
        const rightAnkle = keypoint[16]

        const leftShoulder = keypoint[5]
        const leftElbow = keypoint[7]
        const leftWrist = keypoint[9]
        const leftHip = keypoint[11]
        const leftKnee = keypoint[13]
        const leftAnkle = keypoint[15]

        const leftKeypointArray = [rightWrist, rightElbow, rightShoulder, rightHip, rightKnee, rightAnkle]
        const rightKeypointArray = [leftWrist, leftElbow, leftShoulder, leftHip, leftKnee, leftAnkle]

        if (poses) {
            ctx.beginPath()
            for (let i = 0; i < leftKeypointArray.length - 1; i++) {
                if (leftKeypointArray[i].score > confidenceScore && leftKeypointArray[i + 1].score > confidenceScore) {
                    ctx.moveTo(leftKeypointArray[i].x, leftKeypointArray[i].y);
                    ctx.lineTo(leftKeypointArray[i + 1].x, leftKeypointArray[i + 1].y);
                }
            }
            for (let i = 0; i < rightKeypointArray.length - 1; i++) {
                if (rightKeypointArray[i].score > confidenceScore && rightKeypointArray[i + 1].score > confidenceScore) {
                    ctx.moveTo(rightKeypointArray[i].x, rightKeypointArray[i].y);
                    ctx.lineTo(rightKeypointArray[i + 1].x, rightKeypointArray[i + 1].y);
                }
            }
            //! Shoulder to Shoulder
            if (leftShoulder.score > confidenceScore && rightShoulder.score > confidenceScore) {
                ctx.moveTo(leftShoulder.x, leftShoulder.y);
                ctx.lineTo(rightShoulder.x, rightShoulder.y);
            }

            //! Hip to Hip
            if (leftHip.score > confidenceScore && rightHip.score > confidenceScore) {
                ctx.moveTo(leftHip.x, leftHip.y);
                ctx.lineTo(rightHip.x, rightHip.y);
            }

            // draw line
            ctx.strokeStyle = "white"
            ctx.stroke();

            //! calculate joint angle and render to useReducer
            //! Elbow
            const currentElblowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist, confidenceScore)

            //! Knee
            const currentKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle, confidenceScore)

            //! Hip
            const currentHipAngle = calculateAngle(rightShoulder, rightHip, rightKnee, confidenceScore)

            setElbowAngle(x => x = currentElblowAngle)
            setKneeAngle(x => x = currentKneeAngle)
            setHipAngle(x => x = currentHipAngle)

        }
    }

    const bicepCurlCounter = (currentAngle) => {

        // display angle (Can remove this and measure rep instead)
        // measure rep use canvas

        if (currentAngle > 160) {
            setRepPhase(x => x = "down")
            if (repCount === 0) setStartTime(Date.now())
        }

        if (currentAngle < 40 && repPhase === "down") {
            setRepPhase(x => x = "up")
            setRepCount(x => x += 1)
        }
        if (repCount === 5) {
            setEndTime(Date.now())
            setRepCount(x => x = 0)
        }
    }
    useEffect(() => {
        if (elbowAngle > 10) bicepCurlCounter(elbowAngle)
    }, [elbowAngle])

    const testResult = (startTime, endTime) => {
        setResult(((endTime - startTime) / 1000).toFixed(1))
    }

    useEffect(() => {
        if (elbowAngle > 10) testResult(startTime, endTime)
    }, [elbowAngle])

    // const squatCounter = (kneeAngle, hipAngle) => {

    //     if (kneeAngle < 120) {
    //         setRepPhase(x => x = "down")
    //         if (repCount === 0) setStartTime(Date.now())
    //     }

    //     if (kneeAngle > 160 && repPhase === "down") {
    //         setRepPhase(x => x = "up")
    //         setRepCount(x => x += 1)
    //     }
    //     if (repCount === 5) {
    //         setEndTime(Date.now())
    //         setRepCount(x => x = 0)
    //     }
    // }
    // useEffect(() => {
    //     if (hipAngle > 10) squatCounter(kneeAngle, hipAngle)
    // }, [hipAngle])

    // const testResult = (startTime, endTime) => {
    //     setResult(((endTime - startTime) / 1000).toFixed(1))
    // }

    // useEffect(() => {
    //     if (hipAngle > 10 && endTime) testResult(startTime, endTime)
    // }, [hipAngle])

    // repCounter(elbowAngle)

    // Another state to check for stage = "notReady", "ready", "running"

    // check if ready function
    // if ( stage === "notReady" && currentAngle < "starting angle" ) { wait for 3 seconds }

    // if ( stage === "ready" && currentAngle > "starting angle") { ## verified sitting position
    // setStage = "running" }
    // setStartTime = Date.now()

    // if (stage === "running" && repCount < 5) { repCounter ) }

    // if ( stage === "running" && repCount === 5 ) {
    // endTime = Date.now() 
    // result = endTime - startTime}


    return (
        <div>
            <div>
                <Webcam ref={webcamRef} className={style.webCam} />
                <canvas ref={canvasRef} className={style.canvas} />
            </div>
            <Chart repPhase={repPhase} kneeAngle={kneeAngle} repCount={repCount} result={result} hipAngle={hipAngle} elbowAngle={elbowAngle} setRepCount={setRepCount} setEndTime={setEndTime} />
        </div>
    )
}

export default Render
