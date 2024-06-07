import QuestionItem from "../question-item/QuestionItem";
import "./QuestionList.css";

export default function QuestionList({ questions }) {
    return (
        <div>
            {questions.map((question, index) => (
                <QuestionItem question={question} key={index} />
            ))}
        </div>
    );
}
