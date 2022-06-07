import React from "react";
import "./QuestionView.css";
import BottomBar from "./BottomBar";
import QuestionArea from "./QuestionArea";

function QuestionView() {
    return (
        <div className="question-view">
            <QuestionArea />
            <BottomBar />
        </div>
    );
}

export default QuestionView;
