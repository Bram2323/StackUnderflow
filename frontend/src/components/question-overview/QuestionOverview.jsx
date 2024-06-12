import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import QuestionList from "../shared/question-list/QuestionList.jsx";
import { useSearchParams } from "react-router-dom";
import InputField from "../shared/input-field/InputField.jsx";

function QuestionOverview() {
    const [queryParams, setQueryParams] = useSearchParams();
    const [questions, setQuestions] = useState([]);
    const [titleQuery, setTitleQuery] = useState(
        queryParams.has("title") ? queryParams.get("title") : ""
    );
    const [orderQuery, setOrderQuery] = useState(
        queryParams.has("order-by") ? queryParams.get("order-by") : ""
    );
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const url =
            queryParams.has("title") || queryParams.has("order-by")
                ? "questions/search"
                : "questions";
        ApiService.get(url, queryParams).then((response) => {
            console.log("===========");
            response.data.content.forEach((item) =>
                console.log("AMOUNT:", item.answers, "ID:", item.id)
            );
            console.log("===========");
            setQuestions(response.data.content);
            setTotalPages(response.data.totalPages);
        });
    }, [queryParams]);

    function handleSearch() {
        if (queryParams.get("title") === titleQuery) return;
        queryParams.set("title", titleQuery);
        queryParams.delete("page");
        setQueryParams(queryParams);
    }

    function handleOrderChange(newOrder) {
        if (newOrder === orderQuery) return;
        setOrderQuery(newOrder);
        queryParams.set("order-by", newOrder);
        queryParams.delete("page");
        setQueryParams(queryParams);
    }

    return (
        <div className="pt-3 w-3/4 flex flex-col gap-3">
            <div className="flex gap-2">
                <InputField
                    text={titleQuery}
                    onTextChanged={setTitleQuery}
                    placeHolder="Search..."
                    onSubmit={handleSearch}
                    onBlur={handleSearch}
                />
                <select
                    onChange={(e) => {
                        handleOrderChange(e.target.value);
                    }}
                    name="orders"
                    value={orderQuery}
                >
                    <option value="date-desc">New questions</option>
                    <option value="date-asc">Old questions</option>
                    <option value="most-answers">Most answers</option>
                    <option value="least-answers">Least answers</option>
                </select>
            </div>
            <QuestionList questions={questions} totalPages={totalPages} />
        </div>
    );
}

export default QuestionOverview;
