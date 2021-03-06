import React from "react";
import AboutScreen from "./AboutScreen";
import { category } from "../libs/QuestionTypes";
import "../styles/StartScreen.css";
import Logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

interface StartScreenProps {
    startQuizHandler: (topic: number) => void;
    topic: number;
}

function StartScreen(props: StartScreenProps) {
    const [loadingStarted, setLoadingStarted] = React.useState<boolean>(false);
    const [topicsRetreived, setTopicsRetreived] =
        React.useState<boolean>(false);
    const [topics, setTopics] = React.useState<Array<JSX.Element>>([]);
    const [selectedTopic, setSelectedTopic] = React.useState<number>(
        props.topic
    );
    const navigate = useNavigate();
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
    }, [loadingStarted]);

    function start(): void {
        setLoadingStarted(true);
        props.startQuizHandler(selectedTopic);
    }

    return (
        <div>
            {!loadingStarted ? (
                <div className="start-screen">
                    <button
                        className="info-button"
                        onClick={() => {
                            navigate("/about");
                        }}
                    >
                        <span className="material-symbols-outlined">info</span>
                    </button>
                    <img src={Logo} alt="logo" className="logo" />
                    <h1 className="title">Trivia App</h1>
                    {topicsRetreived ? (
                        <div className="select-wrapper">
                            <select
                                className="topic-select"
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
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                    <button
                        className="start-button"
                        onClick={start}
                        disabled={!topicsRetreived}
                    >
                        {topicsRetreived ? "Start quiz" : "Loading..."}
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
