import User from "../User/User.jsx";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../date-formatter/FormatDate.js";

export default function QuestionItem({ question }) {
    const navigate = useNavigate();

    return (
        <div
            className=" cursor-pointer border-2 border-neutral-400 hover:border-neutral-500 transition-all duration-150 bg-gray-300 p-2 rounded-md flex flex-col gap-1"
            onClick={() => navigate(`/vragen/${question.id}`)}
            key={question.id}
        >
            <h2 className="w-full font-bold text-wrap">{question.title}</h2>
            <p className=" w-full h-6 overflow-hidden overflow-ellipsis text-nowrap text-gray-600">
                {question.text}
            </p>
            <div className="flex h-full w-full items-end justify-between">
                <div>
                    <p>
                        {question.answers} Answer
                        {question.answers != 1 ? "s" : ""}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="leading-tight">
                        <p>Gevraagd op:</p>
                        <p>{formatDate(question.date)}</p>
                    </div>
                    {question.lastEdited && (
                        <div className="leading-tight">
                            <p>Bewerkt op:</p>
                            <p>{formatDate(question.lastEdited)}</p>
                        </div>
                    )}
                    <User user={question.user} />
                </div>
            </div>
        </div>
    );
}
