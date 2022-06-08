import React from "react";
import BottomBar from "./BottomBar";
import CongratulationsBanner from "./CongratulationsBanner";
import "./FinishedQuiz.css";
import { question } from "./libs/QuestionTypes";

interface FinishedQuizProps {
    currentQuestion: number;
    totalQuestions: number;
    questionData: question;
    correctQuestions: number;
    nextQuestionHandler: (answer: string) => void;
    previousQuestionHandler: () => void;
}

function FinishedQuiz(props: FinishedQuizProps) {
    const [viewQuestions, setViewQuestions] = React.useState<boolean>(false);

    function handleViewQuestions() {
        setViewQuestions(true);
    }
    return (
        <div className="finished-quiz-view">
            {viewQuestions ? (
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
            ) : (
                <CongratulationsBanner
                    totalQuestions={props.totalQuestions}
                    correctQuestions={props.correctQuestions}
                    viewQuestions={handleViewQuestions}
                />
            )}
        </div>
    );
}

export default FinishedQuiz;
