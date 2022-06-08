import React from "react";
import "./CongratulationsBanner.css";

interface CongratulationsBannerProps {
    correctQuestions: number;
    totalQuestions: number;
}

function CongratulationsBanner(props: CongratulationsBannerProps) {
    return (
        <div className="congratulations-banner">
            <h1 className="banner-title">Quiz finished!</h1>
            <p className="banner-subtitle">
                You got {props.correctQuestions} out of {props.totalQuestions}{" "}
                questions right
            </p>
            <button className="review-button">Review answers</button>
        </div>
    );
}

export default CongratulationsBanner;
