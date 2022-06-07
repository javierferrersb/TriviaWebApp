import React from "react";
import "./QuestionArea.css";
import Option from "./Option";
import { question } from "./libs/QuestionTypes";

interface QuestionAreaProps {
    questionData: question;
    setUserAnswer: (answer: string) => void;
}
function QuestionArea(props: QuestionAreaProps) {
    const letterArray: string[] = ["A", "B", "C", "D"];
    const [isSelected, setIsSelected] = React.useState<Array<Boolean>>([
        false,
        false,
        false,
        false,
    ]);

    React.useEffect(() => {
        setIsSelected([false, false, false, false]);
    }, [props.questionData]);
    const options: Array<JSX.Element> = props.questionData.answers.map(
        (answer: string, index: number) => {
            return (
                <Option
                    key={index}
                    id={index}
                    text={answer}
                    isSelected={isSelected[index] === true}
                    letter={letterArray[index]}
                    onClick={() => {
                        props.setUserAnswer(answer);
                        setIsSelected((prevValue: Array<Boolean>) => {
                            return prevValue.map(
                                (value: Boolean, i: number) => {
                                    return i === index ? true : false;
                                }
                            );
                        });
                    }}
                />
            );
        }
    );
    return (
        <div className="question-area">
            <div className="question-text">{props.questionData.question}</div>
            <div className="question-options">{options}</div>
        </div>
    );
}

export default QuestionArea;