import windowDimensions from "../libs/windowDimensions";
import Confetti from "react-confetti";
import styles from "../styles/CongratulationsBanner.module.css";
interface CongratulationsBannerProps {
    correctQuestions: number;
    totalQuestions: number;
    viewQuestions: () => void;
    replay: () => void;
}

function CongratulationsBanner(props: CongratulationsBannerProps) {
    const { width, height } = windowDimensions();

    return (
        <div className={styles["congratulations-banner"]}>
            {props.correctQuestions === props.totalQuestions && (
                <Confetti width={width} height={height} opacity={0.6} />
            )}
            <h1 className={styles["banner-title"]}>Quiz finished!</h1>
            <p className={styles["banner-subtitle"]}>
                You got {props.correctQuestions} out of {props.totalQuestions}{" "}
                questions right
            </p>
            <button
                className={styles["review-button"]}
                onClick={props.viewQuestions}
            >
                Review answers
            </button>
            <button className={styles["replay-button"]} onClick={props.replay}>
                Play again
            </button>
        </div>
    );
}

export default CongratulationsBanner;
