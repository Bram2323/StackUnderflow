import User from "../../shared/User/User";

function Answer({ answer }) {

    const creationDate = new Date(answer.date);
    const formattedDate = new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Europe/Amsterdam",
    }).format(creationDate);

    return ( <>
        <div className="answer-container w-full flex flex-col gap-[10px] bg-gray-100 p-[15px] rounded-[10px] border border-solid border-gray-400">
            <p>{answer.text}</p>
            <hr />
            <div className="flex gap-[10px] items-center">
                <User user={answer.user} />
                <p className="pt-[3px]">{formattedDate}</p>
            </div>
        </div>
    </> );
}

export default Answer;
