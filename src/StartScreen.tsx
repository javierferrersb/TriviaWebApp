import React from "react";
import "./StartScreen.css";

interface StartScreenProps {
    startQuizHandler: () => void;
}

function StartScreen(props: StartScreenProps) {
    const [loadingStarted, setLoadingStarted] = React.useState<boolean>(false);

    function start(): void {
        setLoadingStarted(true);
        props.startQuizHandler();
    }
    return (
        <div>
            {!loadingStarted ? (
                <div className="start-screen">
                    <h1 className="title">Trivia App</h1>
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
