import React from "react";
import "./QuestionArea.css";
import Option from "./Option";
import { question } from "./libs/QuestionTypes";

interface QuestionAreaProps {
    questionData: question;
    setUserAnswer: (answer: string) => void;
    IsFinished: boolean;
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
                    IsReviewing={props.IsFinished}
                    key={index}
                    id={index}
                    text={answer}
                    isSelected={isSelected[index] === true}
                    IsCorrect={
                        (props.IsFinished &&
                            answer !== props.questionData.userAnswer &&
                            answer === props.questionData.correctAnswer) ||
                        (answer === props.questionData.userAnswer &&
                            answer === props.questionData.correctAnswer)
                    }
                    IsIncorrect={
                        props.IsFinished &&
                        answer === props.questionData.userAnswer &&
                        props.questionData.userAnswer !==
                            props.questionData.correctAnswer
                    }
                    letter={letterArray[index]}
                    onClick={
                        !props.IsFinished
                            ? () => {
                                  props.setUserAnswer(answer);
                                  setIsSelected((prevValue: Array<Boolean>) => {
                                      return prevValue.map(
                                          (value: Boolean, i: number) => {
                                              return i === index ? true : false;
                                          }
                                      );
                                  });
                              }
                            : () => {}
                    }
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
