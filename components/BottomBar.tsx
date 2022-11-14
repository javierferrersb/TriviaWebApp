import styles from "../styles/BottomBar.module.css";

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
        <div className={styles["bottom-bar"]}>
            <div className={styles["progress-area"]}>
                <div className={styles["progress-indicator"]}>
                    <div
                        className={styles["progress-indicator-fill"]}
                        style={{
                            width:
                                ((props.currentQuestion + 1) /
                                    props.totalQuestions) *
                                    100 +
                                "%",
                        }}
                    ></div>
                </div>
                <div className={styles["progress-text"]}>
                    {props.currentQuestion + 1} / {props.totalQuestions}
                </div>
            </div>
            <div className={styles["button-area"]}>
                {props.IsFinished && (
                    <button
                        disabled={props.currentQuestion === 0}
                        className={styles["next-button"]}
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
                    className={styles["next-button"]}
                    onClick={props.nextQuestionHandler}
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}

export default BottomBar;
