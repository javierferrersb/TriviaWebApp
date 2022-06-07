import React from "react";
import "./QuestionArea.css";
import Option from "./Option";
import { question } from "./libs/QuestionTypes";

interface QuestionAreaProps {
    questionData: question;
}
function QuestionArea(props: QuestionAreaProps) {
    const letterArray: string[] = ["A", "B", "C", "D"];
    const [selectedOption, setSelectedOption] = React.useState<string>("");
    const [isSelected, setIsSelected] = React.useState<Array<Boolean>>([
        false,
        false,
        false,
        false,
    ]);

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
                        setSelectedOption(answer);
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
