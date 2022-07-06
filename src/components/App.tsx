import React from "react";
import "../styles/App.css";
import ErrorMessage from "./ErrorMessage";
import FinishedQuiz from "./FinishedQuiz";
import { question, questionArray } from "../libs/QuestionTypes";
import QuestionView from "./QuestionView";
import StartScreen from "./StartScreen";
import { Routes, Route } from "react-router-dom";
import AboutScreen from "./AboutScreen";

function App() {
    const [appStarted, setAppStarted] = React.useState(false);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [questions, setQuestions] = React.useState<questionArray>([]);
    const [quizEnded, setQuizEnded] = React.useState(false);
    const [topic, setTopic] = React.useState(-1);
    const [error, setError] = React.useState(false);
    interface questionsData {
        category: string;
        type: string;
        difficulty: string;
        question: string;
        correct_answer: string;
        incorrect_answers: string[];
    }

    function startApp(topicId: number): void {
        setTopic(topicId);
        fetch(
            "https://opentdb.com/api.php?amount=5&type=multiple&encode=base64" +
                (topicId !== -1 ? "&category=" + topicId : "")
        )
            .then((response) => response.json())
            .then((data) => {
                setQuestions(
                    data.results.map((question: questionsData) => {
                        return {
                            question: decode(question.question),
                            answers: decodeString(question.incorrect_answers)
                                .concat(decode(question.correct_answer))
                                .sort(
                                    (a: string, b: string) =>
                                        0.5 - Math.random()
                                ),
                            correctAnswer: decode(question.correct_answer),
                        };
                    })
                );
                setAppStarted(true);
            })
            .catch((error) => {
                setError(true);
            });
    }

    function decode(str: string): string {
        return decodeURIComponent(escape(window.atob(str)));
    }

    function decodeString(arr: string[]): string[] {
        return arr.map((str) => decode(str));
    }

    function nextQuestion(previousAnswer: string): void {
        if (!quizEnded) {
            questions[currentQuestion].userAnswer = previousAnswer;
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prevValue: number) => {
                return prevValue + 1;
            });
        } else {
            setQuizEnded(true);

            setCurrentQuestion(0);
        }
    }
    function previousQuestion(): void {
        if (currentQuestion > 0) {
            setCurrentQuestion((prevValue: number) => {
                return prevValue - 1;
            });
        }
    }

    function getScore(): number {
        return questions.reduce((score: number, aquestion: question) => {
            if (aquestion.userAnswer === aquestion.correctAnswer) {
                return score + 1;
            } else {
                return score;
            }
        }, 0);
    }

    function replay(): void {
        setQuizEnded(false);
        setCurrentQuestion(0);
        setAppStarted(false);
    }

    return (
        <div>
            <Routes>
                <Route
                    path="*"
                    element={
                        error ? (
                            <ErrorMessage />
                        ) : quizEnded ? (
                            <FinishedQuiz
                                currentQuestion={currentQuestion}
                                totalQuestions={questions.length}
                                questionData={questions[currentQuestion]}
                                nextQuestionHandler={nextQuestion}
                                previousQuestionHandler={previousQuestion}
                                correctQuestions={getScore()}
                                replayQuizHandler={replay}
                            />
                        ) : appStarted ? (
                            <QuestionView
                                currentQuestion={currentQuestion}
                                totalQuestions={questions.length}
                                questionData={questions[currentQuestion]}
                                nextQuestionHandler={nextQuestion}
                            />
                        ) : (
                            <StartScreen
                                startQuizHandler={startApp}
                                topic={topic}
                            />
                        )
                    }
                />
                <Route path="/about" element={<AboutScreen />} />
            </Routes>
        </div>
    );
}

export default App;
