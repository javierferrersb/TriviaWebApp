import React from "react";
import "./App.css";
import { questionArray } from "./libs/QuestionTypes";
import QuestionView from "./QuestionView";
import StartScreen from "./StartScreen";

function App() {
    const [appStarted, setAppStarted] = React.useState(false);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [questions, setQuestions] = React.useState<questionArray>([]);
    interface questionsData {
        category: string;
        type: string;
        difficulty: string;
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
    }

    function startApp(): void {
        setAppStarted(true);
    }

    function nextQuestion(): void {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prevValue: number) => {
                return prevValue + 1;
            });
        }
    }
    function fixFormattingArray(originalStrings: string[]): string[] {
        return originalStrings.map((originalString: string) => {
            return fixFormatting(originalString);
        });
    }

    function fixFormatting(originalString: string): string {
        return originalString
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&#x27;/g, "'")
            .replace(/&#x2F;/g, "/");
    }

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((response) => response.json())
            .then((data) => {
                setQuestions(
                    data.results.map((question: questionsData) => {
                        return {
                            question: fixFormatting(question.question),
                            answers: fixFormattingArray(
                                question.incorrect_answers
                            ).concat(fixFormatting(question.correct_answer)),
                            correctAnswer: fixFormatting(
                                question.correct_answer
                            ),
                        };
                    })
                );
            });
    }, [appStarted]);

    return appStarted ? (
        <QuestionView
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            questionData={questions[currentQuestion]}
            nextQuestionHandler={nextQuestion}
        />
    ) : (
        <StartScreen startQuizHandler={startApp} />
    );
}

export default App;
