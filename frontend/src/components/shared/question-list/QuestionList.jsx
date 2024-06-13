import Pageable from "../pageable/Pageable";
import QuestionItem from "../question-item/QuestionItem";
import "./QuestionList.css";

export default function QuestionList({ questions, totalPages }) {
    return (
        <div>
            <Pageable totalPages={totalPages} />
            {questions.length == 0 ? (
                <p>Geen vragen gevonden!</p>
            ) : (
                questions.map((question, index) => (
                    <QuestionItem question={question} key={index} />
                ))
            )}
            <Pageable totalPages={totalPages} />
        </div>
    );
}
