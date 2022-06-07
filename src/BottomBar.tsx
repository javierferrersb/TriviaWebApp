import React from "react";
import "./BottomBar.css";

interface BottomBarProps {
    currentQuestion: number;
    totalQuestions: number;
    nextQuestionHandler: () => void;
    IsEnabled: Boolean;
}

function BottomBar(props: BottomBarProps) {
    return (
        <div className="bottom-bar">
            <div className="progress-area">
                <div className="progress-indicator">
                    <div
                        className="progress-indicator-fill"
                        style={{
                            width:
                                ((props.currentQuestion + 1) /
                                    props.totalQuestions) *
                                    100 +
                                "%",
                        }}
                    ></div>
                </div>
                <div className="progress-text">
                    {props.currentQuestion + 1} / {props.totalQuestions}
                </div>
            </div>
            <button
                disabled={!props.IsEnabled}
                className="next-button"
                onClick={props.nextQuestionHandler}
            >
                CONTINUE
            </button>
        </div>
    );
}

export default BottomBar;
