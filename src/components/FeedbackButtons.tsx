import { QuestionAnswer } from "../type";

interface FeedbackButtonsProps {
    answers: QuestionAnswer[];
    handleClick: (answer: string) => void;
    clicked: string | null;
}

const FeedbackButtons = ({ answers, handleClick, clicked }: FeedbackButtonsProps) => {
    return (
        <div className="buttons d-flex">
            {answers.length > 0 &&
                answers.map((answer, index) => (
                    <button
                        key={index}
                        className={`emoji-button ${clicked === answer.answer ? "grow" : ""} d-flex flex-column`}
                        onClick={() => handleClick(answer.answer)}
                    >
                        {answer.image_url && (
                            <img
                                src={`${window.location.protocol}//pyincorporation.com${answer.image_url}`}
                                alt={answer.answer}
                            />
                        )}
                        <span>{answer.answer}</span>
                    </button>
                ))}
        </div>
    );
};

export default FeedbackButtons;
