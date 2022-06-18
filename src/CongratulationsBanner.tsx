import React from "react";
import "./CongratulationsBanner.css";
import windowDimensions from "./windowDimensions";
import Confetti from "react-confetti";
interface CongratulationsBannerProps {
    correctQuestions: number;
    totalQuestions: number;
    viewQuestions: () => void;
    replay: () => void;
}

function CongratulationsBanner(props: CongratulationsBannerProps) {
    const { width, height } = windowDimensions();

    return (
        <div className="congratulations-banner">
            {props.correctQuestions === props.totalQuestions && (
                <Confetti width={width} height={height} opacity={0.6} />
            )}
            <h1 className="banner-title">Quiz finished!</h1>
            <p className="banner-subtitle">
                You got {props.correctQuestions} out of {props.totalQuestions}{" "}
                questions right
            </p>
            <button className="review-button" onClick={props.viewQuestions}>
                Review answers
            </button>
            <button className="replay-button" onClick={props.replay}>
                Play again
            </button>
        </div>
    );
}

export default CongratulationsBanner;
