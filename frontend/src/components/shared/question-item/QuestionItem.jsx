import User from "../User/User.jsx";
import { useNavigate } from "react-router-dom";

function formatDate(date) {
    const creationDate = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Europe/Amsterdam",
    }).format(creationDate);

    return formattedDate;
}

export default function QuestionItem({ question }) {
    const navigate = useNavigate();
    return (
        <div
            className=" cursor-pointer bg-gray-300 pt-2 pb-2 pl-2 mt-2"
            onClick={() => navigate(`/vragen/${question.id}`)}
            key={question.id}
        >
            <div className="question-title">{question.title}</div>
            <div className=" flex items-center gap-1">
                <p>geplaatst door:</p> <User user={question.user} />
            </div>
            <div>datum: {formatDate(question.date)}</div>
        </div>
    );
}
