import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import InputField from "../input-field/InputField";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import "./QuestionFilter.css";

function QuestionFilter() {
    const navigate = useNavigate();
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
            <div className="question-filter-container flex justify-between items-baseline gap-2">
                <div className="flex gap-2 w-full h-fit items-baseline">
                    <InputField
                        text={titleQuery}
                        onTextChanged={setTitleQuery}
                        placeHolder="Zoeken..."
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
                        <option value="date-desc">Nieuwste vragen</option>
                        <option value="date-asc">Oudste vragen</option>
                        <option value="most-answers">Meeste antwoorden</option>
                        <option value="least-answers">Minste antwoorden</option>
                    </select>
                </div>
                <Button
                    text={"Stel Vraag"}
                    onClick={() => navigate("/vragen/aanmaken")}
                />
            </div>
        </>
    );
}

export default QuestionFilter;
