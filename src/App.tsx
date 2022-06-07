import React from "react";
import "./App.css";
import QuestionView from "./QuestionView";
import StartScreen from "./StartScreen";

function App() {
    const [appStarted, setAppStarted] = React.useState(false);

    function startApp(): void {
        setAppStarted(true);
    }

    return appStarted ? (
        <QuestionView />
    ) : (
        <StartScreen startQuizHandler={startApp} />
    );
}

export default App;
