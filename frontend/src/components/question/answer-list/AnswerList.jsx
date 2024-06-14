import Pageable from "../../shared/pageable/Pageable";
import Answer from "../answer/Answer";

function AnswerList({ answers, setAnswer, isQuestionOwner, totalPages }) {
    return (
        <>
            <div className="flex flex-col gap-5 pb-2">
                <Pageable totalPages={totalPages} />
                {answers.map((answer, index) => (
                    <Answer
                        key={index}
                        answer={answer}
                        setAnswer={setAnswer}
                        isQuestionOwner={isQuestionOwner}
                    />
                ))}
                <Pageable totalPages={totalPages} />
            </div>
        </>
    );
}

export default AnswerList;
