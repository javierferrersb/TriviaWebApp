import "../styles/BottomBar.css";

interface BottomBarProps {
    currentQuestion: number;
    totalQuestions: number;
    nextQuestionHandler: () => void;
    IsEnabled: Boolean;
    IsFinished: Boolean;
    previousQuestionHandler: () => void;
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
            <div className="button-area">
                {props.IsFinished && (
                    <button
                        disabled={props.currentQuestion === 0}
                        className="next-button"
                        onClick={props.previousQuestionHandler}
                    >
                        PREVIOUS
                    </button>
                )}
                <button
                    disabled={
                        !props.IsFinished
                            ? (!props.IsEnabled as boolean)
                            : props.currentQuestion + 1 === props.totalQuestions
                            ? true
                            : false
                    }
                    className="next-button"
                    onClick={props.nextQuestionHandler}
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}

export default BottomBar;
