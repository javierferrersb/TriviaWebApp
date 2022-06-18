import React from "react";
import "./Option.css";

interface OptionProps {
    text: string;
    id: number;
    letter: string;
    isSelected: boolean;
    onClick: () => void;
    IsCorrect: boolean;
    IsIncorrect: boolean;
    IsReviewing: boolean;
}
function Option(props: OptionProps) {
    let className: string =
        "question-option" + (props.isSelected ? " active" : "");
    if (props.IsCorrect) {
        className += " correct";
    } else if (props.IsIncorrect) {
        className += " incorrect";
    }
    if (props.IsReviewing) {
        className += " reviewing";
    }
    return (
        <div className={className} onClick={props.onClick}>
            <div className="option-letter">{props.letter}</div>
            <div className="option-text">{props.text}</div>
        </div>
    );
}

export default Option;
