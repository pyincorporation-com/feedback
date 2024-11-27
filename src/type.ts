export interface Question {
  question_text: string;
  question_id: number;
  question_type: QuestionType;
  question_answers: QuestionAnswer[];
}

type QuestionType = "MC" | "TF" | "SA";

export interface QuestionAnswer {
  answer: string;
  answer_count: number;
  image_url: string | null;
  short_answers: string[];
}

export interface PieChartValues {
  value: number;
  label: string;
}

export interface AnswerFormat {
  question: string;
  question_id: number;
  answer: string;
}
