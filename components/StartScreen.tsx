import React from "react";
import Image from "next/image";
import { category } from "../libs/QuestionTypes";
import Link from "next/link";
import styles from "../styles/StartScreen.module.css";

interface StartScreenProps {
    startQuizHandler: (topic: number) => void;
    topic: number;
}

interface APIData {
    trivia_categories: category[];
}

export async function getStaticProps(): Promise<{
    props: {
        data: APIData;
    };
}> {
    const data = await fetch("https://opentdb.com/api_category.php");
    return {
        props: {
            data: await data.json(),
        },
    };
}

function StartScreen(props: StartScreenProps) {
    const [loadingStarted, setLoadingStarted] = React.useState<boolean>(false);
    const [topicsRetreived, setTopicsRetreived] =
        React.useState<boolean>(false);
    const [topics, setTopics] = React.useState<Array<JSX.Element>>([]);
    const [selectedTopic, setSelectedTopic] = React.useState<number>(
        props.topic
    );

    React.useEffect(() => {
        getStaticProps().then((data) => {
            setTopics(
                data.props.data.trivia_categories.map((topic: category) => {
                    return (
                        <option key={topic.id} value={topic.id}>
                            {topic.name}
                        </option>
                    );
                })
            );
            setTopicsRetreived(true);
        });
    }, []);
    function start(): void {
        setLoadingStarted(true);
        props.startQuizHandler(selectedTopic);
    }
    return (
        <div>
            {!loadingStarted ? (
                <div className={styles["start-screen"]}>
                    <Link href="/about">
                        <button
                            className={styles["info-button"]}
                            onClick={() => {}}
                        >
                            <span className="material-symbols-outlined">
                                info
                            </span>
                        </button>
                    </Link>

                    <Image
                        src={"/images/logo.png"}
                        alt="logo"
                        className="logo"
                        height={100}
                        width={100}
                    />
                    <h1 className={styles["title"]}>Trivia App</h1>
                    {topicsRetreived ? (
                        <div className={styles["select-wrapper"]}>
                            <select
                                className={styles["topic-select"]}
                                value={selectedTopic}
                                onChange={(e) => {
                                    setSelectedTopic(Number(e.target.value));
                                }}
                            >
                                <option value="-1">All topics</option>
                                {topics}
                            </select>
                        </div>
                    ) : (
                        <div className={styles["lds-ellipsis"]}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                    <button
                        className={styles["start-button"]}
                        onClick={start}
                        disabled={!topicsRetreived}
                    >
                        {topicsRetreived ? "Start quiz" : "Loading..."}
                    </button>
                </div>
            ) : (
                <div className={styles["start-screen"]}>
                    <div className={styles["lds-spinner"]}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StartScreen;
