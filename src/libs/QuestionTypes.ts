interface question {
    question: string;
    answers: string[];
    correctAnswer: string;
    userAnswer: string;
}

interface questionArray extends Array<question> {}

export type { question, questionArray };
