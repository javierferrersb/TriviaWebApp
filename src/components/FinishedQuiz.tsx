import React from "react";
import BottomBar from "./BottomBar";
import CongratulationsBanner from "./CongratulationsBanner";
import "../styles/FinishedQuiz.css";
import { question } from "../libs/QuestionTypes";
import QuestionArea from "./QuestionArea";

interface FinishedQuizProps {
    currentQuestion: number;
    totalQuestions: number;
    questionData: question;
    correctQuestions: number;
    nextQuestionHandler: (answer: string) => void;
    previousQuestionHandler: () => void;
    replayQuizHandler: () => void;
}

function FinishedQuiz(props: FinishedQuizProps) {
    const [viewQuestions, setViewQuestions] = React.useState<boolean>(false);

    function handleViewQuestions() {
        setViewQuestions(true);
    }
    return (
        <div className="finished-quiz-view">
            {viewQuestions ? (
                <div className="answer-view">
                    <QuestionArea
                        questionData={props.questionData}
                        setUserAnswer={(answer: string) => {}}
                        IsFinished={true}
                    />
                    <BottomBar
                        currentQuestion={props.currentQuestion}
                        IsEnabled={
                            props.currentQuestion + 1 !== props.totalQuestions
                        }
                        totalQuestions={props.totalQuestions}
                        nextQuestionHandler={() => {
                            props.nextQuestionHandler("");
                        }}
                        IsFinished={true}
                        previousQuestionHandler={props.previousQuestionHandler}
                    />
                    <button
                        className="replay-button-questions"
                        onClick={props.replayQuizHandler}
                    >
                        Play again
                    </button>
                </div>
            ) : (
                <CongratulationsBanner
                    totalQuestions={props.totalQuestions}
                    correctQuestions={props.correctQuestions}
                    viewQuestions={handleViewQuestions}
                    replay={props.replayQuizHandler}
                />
            )}
        </div>
    );
}

export default FinishedQuiz;
