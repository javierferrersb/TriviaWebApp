import styles from "../styles/ErrorMessage.module.css";
function ErrorMessage() {
    return (
        <div className={styles["error-area"]}>
            <div className={styles["error-message-area"]}>
                <h1 className={styles["error-message-title"]}>Error!</h1>
                <p className={styles["error-message-text"]}>
                    Something went wrong. Please try again later. Are you sure
                    you are connected to the internet?
                </p>
            </div>
        </div>
    );
}

export default ErrorMessage;
