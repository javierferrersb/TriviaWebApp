import styles from "../styles/AboutScreen.module.css";
import Link from "next/link";
import Image from "next/image";

function AboutScreen() {
    return (
        <div className={styles["about-area"]}>
            <Link href="/" prefetch={true}>
                <button className={styles["back-button"]}>BACK</button>
            </Link>

            <Image
                src={"/images/logo.png"}
                alt="logo"
                className="logo"
                width={100}
                height={100}
            />

            <div className={styles["about-message-area"]}>
                <h1 className={styles["about-message-title"]}>Trivia App</h1>
                <p className={styles["about-message-text"]}>
                    Simple trivia webapp made using React and Typescript
                </p>
                <div className={styles["links"]}>
                    <a
                        className={styles["about-message-link"]}
                        href="https://opentdb.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Questions obtained from Open Trivia DB (CC BY-SA 4.0)
                    </a>
                    <a
                        className={styles["about-message-link"]}
                        href="https://github.com/javierferrersb/TriviaWebApp"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github Project Link
                    </a>
                </div>
            </div>
            <a
                className={styles["footer-message"]}
                href="https://github.com/javierferrersb/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Made with ❤️ in Spain
            </a>
        </div>
    );
}

export default AboutScreen;
