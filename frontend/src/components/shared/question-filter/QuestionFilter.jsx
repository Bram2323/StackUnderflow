import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import InputField from "../input-field/InputField";

function QuestionFilter() {
    const [queryParams, setQueryParams] = useSearchParams();
    const [titleQuery, setTitleQuery] = useState(
        queryParams.has("title") ? queryParams.get("title") : ""
    );
    const [orderQuery, setOrderQuery] = useState(
        queryParams.has("order-by") ? queryParams.get("order-by") : ""
    );

    function handleSearch() {
        if (queryParams.get("title") === titleQuery) return;
        if (titleQuery == "") queryParams.delete("title");
        else queryParams.set("title", titleQuery);
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
        <>
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
        </>
    );
}

export default QuestionFilter;
