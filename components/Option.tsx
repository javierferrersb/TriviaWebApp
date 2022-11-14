import styles from "../styles/Option.module.css";
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
    let className: string = "";
    let className2: string = "";
    if (props.isSelected) {
        className = "active";
    } else if (props.IsCorrect) {
        className = "correct";
    } else if (props.IsIncorrect) {
        className = "incorrect";
    }
    if (props.IsReviewing) {
        className2 = "reviewing";
    }
    return (
        <div
            className={`${styles["question-option"]} ${styles[className]}  ${styles[className2]}`}
            onClick={props.onClick}
        >
            <div className={styles["option-letter"]}>{props.letter}</div>
            <div className={styles["option-text"]}>{props.text}</div>
        </div>
    );
}

export default Option;
