import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import QuestionList from "../shared/question-list/QuestionList.jsx";
import { useSearchParams } from "react-router-dom";
import QuestionFilter from "../shared/question-filter/QuestionFilter.jsx";

function QuestionOverview() {
    const [queryParams] = useSearchParams();
    const [questions, setQuestions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const url =
            queryParams.has("title") || queryParams.has("order-by")
                ? "questions/search"
                : "questions";
        ApiService.get(url, queryParams).then((response) => {
            // console.log("===========");
            // response.data.content.forEach((item) =>
            //     console.log("AMOUNT:", item.answers, "ID:", item.id)
            // );
            // console.log("===========");
            setQuestions(response.data.content);
            setTotalPages(response.data.totalPages);
        });
    }, [queryParams]);

    return (
        <div className="pt-3 w-3/4 flex flex-col gap-3">
            <QuestionFilter />
            <QuestionList questions={questions} totalPages={totalPages} />
        </div>
    );
}

export default QuestionOverview;
