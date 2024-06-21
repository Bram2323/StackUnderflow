import User from "../user/User.jsx";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../date-formatter/FormatDate.js";

export default function QuestionItem({ question }) {
    const navigate = useNavigate();

    function getCategoryName(category) {
        switch (category) {
            case "CYBER":
                return "Cyber Security";
            case "DATA":
                return "Data Engineering / Science";
            case "JAVA":
                return "Java";
            case "CLOUD":
                return "Cloud Engineering";
            case "GENERAL":
                return "Algemeen";
            default:
                return category;
        }
    }

    return (
        <div
            className=" cursor-pointer border-2 border-neutral-300 hover:border-neutral-400 transition-all duration-150 bg-gray-200 p-2 rounded-md flex flex-col gap-1"
            onClick={() => navigate(`/vragen/${question.id}`)}
            key={question.id}
        >
            <h2 className="w-full text-[120%] font-bold overflow-hidden overflow-ellipsis text-nowrap">
                {question.title}
            </h2>
            <p className=" w-full h-6 overflow-hidden overflow-ellipsis text-nowrap text-gray-600">
                {question.text}
            </p>
            <div className="flex h-full w-full items-end justify-between">
                <div className="">
                    <p
                        className={
                            "font-bold " +
                            (question.answers > 0
                                ? "text-[#12a8c0]"
                                : "text-[#ff6d00]")
                        }
                    >
                        {question.answers} Antwoord
                        {question.answers != 1 ? "en" : ""}
                    </p>
                    <p className="text-xs bg-[#12A8C0] text-white rounded-full w-fit text-center my-1 py-1 px-2 ">
                        {getCategoryName(question.category)}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="leading-tight text-[12px] flex flex-col justify-center">
                        <p>Gevraagd op:</p>
                        <p>{formatDate(question.date)}</p>
                    </div>
                    {question.lastEdited && (
                        <div className="leading-tight text-[12px] flex flex-col justify-center">
                            <p>Bewerkt op:</p>
                            <p>{formatDate(question.lastEdited)}</p>
                        </div>
                    )}
                    <User user={question.user} className="max-md:hidden" />
                </div>
            </div>
            <User user={question.user} className=" self-end md:hidden" />
        </div>
    );
}
