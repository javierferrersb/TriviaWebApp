import React from "react";
import { category } from "./libs/QuestionTypes";
import "./StartScreen.css";

interface StartScreenProps {
    startQuizHandler: () => void;
}

function StartScreen(props: StartScreenProps) {
    const [loadingStarted, setLoadingStarted] = React.useState<boolean>(false);
    const [topicsRetreived, setTopicsRetreived] =
        React.useState<boolean>(false);
    const [topics, setTopics] = React.useState<Array<JSX.Element>>([]);
    React.useEffect(() => {
        if (!loadingStarted) {
            fetch("https://opentdb.com/api_category.php")
                .then((response) => response.json())
                .then((data) => {
                    setTopics(
                        data.trivia_categories.map((topic: category) => {
                            return (
                                <option key={topic.id} value={topic.id}>
                                    {topic.name}
                                </option>
                            );
                        })
                    );
                    setTopicsRetreived(true);
                });
        }
    });
    function start(): void {
        setLoadingStarted(true);
        props.startQuizHandler();
    }
    return (
        <div>
            {!loadingStarted ? (
                <div className="start-screen">
                    <h1 className="title">Trivia App</h1>
                    {topicsRetreived ? (
                        <div className="select-wrapper">
                            <select className="topic-select">
                                <option value="-1">All topics</option>
                                {topics}
                            </select>
                        </div>
                    ) : (
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                    <button className="start-button" onClick={start}>
                        Start quiz
                    </button>
                </div>
            ) : (
                <div className="start-screen">
                    <div className="lds-spinner">
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
