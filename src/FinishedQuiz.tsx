import React from "react";
import BottomBar from "./BottomBar";
import "./FinishedQuiz.css";
import { question } from "./libs/QuestionTypes";

interface FinishedQuizProps {
    currentQuestion: number;
    totalQuestions: number;
    questionData: question;
    nextQuestionHandler: (answer: string) => void;
    previousQuestionHandler: () => void;
}

function FinishedQuiz(props: FinishedQuizProps) {
    return (
        <div className="finished-quiz-view">
            <div className="finished-quiz-text">
                You have finished the quiz!
            </div>
            <BottomBar
                currentQuestion={props.currentQuestion}
                IsEnabled={props.currentQuestion + 1 !== props.totalQuestions}
                totalQuestions={props.totalQuestions}
                nextQuestionHandler={() => {
                    props.nextQuestionHandler("");
                }}
                IsFinished={true}
                previousQuestionHandler={props.previousQuestionHandler}
            />
        </div>
    );
}

export default FinishedQuiz;
