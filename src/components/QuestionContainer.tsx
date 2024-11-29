import FeedbackButtons from "./FeedbackButtons";
import { Question } from "../type";
import PieChartComponent from "./PieChart";
import { useEffect } from "react";
import { useChartValues } from "../contexts/chartValuesProvider";

interface QuestionContainerProps {
    feedbackQuestion: Question;
    hasAnswered: boolean;
    handleClick: (answer: string) => void;
    clicked: string | null;
}

const QuestionContainer = ({
    feedbackQuestion,
    hasAnswered,
    handleClick,
    clicked,
}: QuestionContainerProps) => {
    const { setChartValues } = useChartValues();

    useEffect(() => {
        const transformedChartValues = feedbackQuestion.question_answers.map((answer) => ({
            value: answer.answer_count,
            label: answer.answer,
        }));
        setChartValues(transformedChartValues);
    }, [feedbackQuestion.question_answers, setChartValues]);

    const qn_headers = [
        "Let me pause a question!",
        "Here's a quick question!",
        "What do you think?",
        "Let's hear your thoughts!",
        "Got a moment for this?",
        "Care to answer this?",
        "Pause and ponder!",
        "Quick query time!",
        "Your opinion matters!",
        "A thought for you!",
        "Let me ask this!",
        "Can I pick your brain?",
        "A small question!",
        "Your view counts!",
        "Help us decide!",
        "A quick one for you!",
        "Think about this!",
        "Let's hear from you!",
        "Share your opinion!",
        "Answer this for us!",
        "Your input, please!",
    ];

    return (
        <div
            className={`d-flex align-items-center flex-column secondary-container ${clicked ? "animate" : ""}`}
        >
            {!hasAnswered ? (
                <>
                    <h1>
                        <b>
                            <u>{qn_headers[Math.floor(Math.random() * qn_headers.length)]}</u>
                        </b>
                    </h1>
                    <p className="qn">{feedbackQuestion.question_text}</p>
                    <FeedbackButtons
                        answers={feedbackQuestion.question_answers}
                        handleClick={handleClick}
                        clicked={clicked}
                    />
                </>
            ) : (
                <>
                    <h1>
                        <b>
                            <u>Majority response</u>
                        </b>
                    </h1>
                    <p className="qn">
                        <b>Qn: </b>
                        {feedbackQuestion.question_text}
                    </p>
                    <PieChartComponent />
                </>
            )}
        </div>
    );
};

export default QuestionContainer;
