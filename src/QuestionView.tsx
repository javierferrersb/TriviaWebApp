import React from "react";
import "./QuestionView.css";
import { question } from "./libs/QuestionTypes";
import BottomBar from "./BottomBar";
import QuestionArea from "./QuestionArea";

interface QuestionViewProps {
    currentQuestion: number;
    totalQuestions: number;
    questionData: question;
    nextQuestionHandler: (answer: string) => void;
}
function QuestionView(props: QuestionViewProps) {
    const [selectedOption, setSelectedOption] = React.useState<string>("");

    React.useEffect(() => {
        setSelectedOption("");
    }, [props.questionData]);
    return (
        <div className="question-view">
            <QuestionArea
                questionData={props.questionData}
                setUserAnswer={(answer: string) => {
                    setSelectedOption(answer);
                }}
            />
            <BottomBar
                currentQuestion={props.currentQuestion}
                totalQuestions={props.totalQuestions}
                IsEnabled={selectedOption !== ""}
                nextQuestionHandler={() => {
                    props.nextQuestionHandler(selectedOption);
                }}
                IsFinished={false}
                previousQuestionHandler={() => {}}
            />
        </div>
    );
}

export default QuestionView;
