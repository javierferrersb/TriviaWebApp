import React from "react";
import "./StartScreen.css";

interface StartScreenProps {
    startQuizHandler: () => void;
}

function StartScreen(props: StartScreenProps) {
    return (
        <div className="start-screen">
            <h1 className="title">Trivia App</h1>
            <button className="start-button" onClick={props.startQuizHandler}>
                Start quiz
            </button>
        </div>
    );
}

export default StartScreen;
