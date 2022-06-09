interface question {
    question: string;
    answers: string[];
    correctAnswer: string;
    userAnswer: string;
}

interface questionArray extends Array<question> {}

interface category {
    name: string;
    id: number;
}

export type { question, questionArray, category };
