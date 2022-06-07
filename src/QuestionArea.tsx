import React from "react";
import "./QuestionArea.css";
import Option from "./Option";

function QuestionArea() {
    return (
        <div className="question-area">
            <div className="question-text">What is 1+1?</div>
            <div className="question-options">
                <Option />
                <Option />
                <Option />
                <Option />
            </div>
        </div>
    );
}

export default QuestionArea;
