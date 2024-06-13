import User from "../User/User.jsx";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../date-formatter/FormatDate.js";

export default function QuestionItem({ question }) {
    const navigate = useNavigate();
    console.log(question);

    return (
        <div
            className=" cursor-pointer bg-gray-300 p-2 my-2"
            onClick={() => navigate(`/vragen/${question.id}`)}
            key={question.id}
        >
            <div className="question-title">{question.title}</div>
            <div className=" flex items-center gap-1">
                <p>geplaatst door:</p> <User user={question.user} />
            </div>
            <div className="flex gap-10">
                <p>datum: {formatDate(question.date)}</p>
                {question.lastEdited && (
                    <p>bewerkt: {formatDate(question.lastEdited)}</p>
                )}
            </div>
        </div>
    );
}
