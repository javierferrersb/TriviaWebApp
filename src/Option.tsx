import React from "react";
import "./Option.css";

interface OptionProps {
    text: string;
    id: number;
    letter: string;
    isSelected: boolean;
    onClick: () => void;
}
function Option(props: OptionProps) {
    let className: string =
        "question-option" + (props.isSelected ? " active" : "");
    return (
        <div className={className} onClick={props.onClick}>
            <div className="option-letter">{props.letter}</div>
            <div className="option-text">{props.text}</div>
        </div>
    );
}

export default Option;
