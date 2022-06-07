interface question {
    question: string;
    answers: string[];
    correctAnswer: string;
}

interface questionArray extends Array<question> {}

export type { question, questionArray };
