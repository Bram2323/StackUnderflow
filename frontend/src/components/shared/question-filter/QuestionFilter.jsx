import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import InputField from "../input-field/InputField";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import "./QuestionFilter.css";
import UserService from "../../../services/UserService";

function QuestionFilter({ showAskQuestion = true }) {
    const navigate = useNavigate();
    const [queryParams, setQueryParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(
        queryParams.has("search") ? queryParams.get("search") : ""
    );
    const [orderQuery, setOrderQuery] = useState(
        queryParams.has("order-by") ? queryParams.get("order-by") : ""
    );
    const [categoryQuery, setCategoryQuery] = useState(
        queryParams.has("category") ? queryParams.get("category") : ""
    );

    function handleSearch() {
        if (queryParams.get("search") === searchQuery) return;
        if (searchQuery == "") queryParams.delete("search");
        else queryParams.set("search", searchQuery);
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

    function handleCategoryChange(newCategory) {
        if (newCategory === categoryQuery) return;
        setCategoryQuery(newCategory);
        if (newCategory == "") queryParams.delete("category");
        else queryParams.set("category", newCategory);
        queryParams.delete("page");
        setQueryParams(queryParams);
    }

    return (
        <>
            <div className="question-filter-container flex justify-between items-baseline gap-2">
                <div className="flex gap-2 w-full h-fit items-baseline">
                    <InputField
                        text={searchQuery}
                        onTextChanged={setSearchQuery}
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
                    <select
                        onChange={(e) => {
                            handleCategoryChange(e.target.value);
                        }}
                        name="categories"
                        value={categoryQuery}
                    >
                        <option value="">Alle categorieën</option>
                        <option value="general">Algemeen</option>
                        <option value="data">Data Engineering / Science</option>
                        <option value="cloud">Cloud Engineering</option>
                        <option value="cyber">Cyber Security</option>
                        <option value="java">Java</option>
                    </select>
                </div>
                {showAskQuestion && UserService.isLoggedIn() && (
                    <Button
                        text={"Stel Vraag"}
                        onClick={() => navigate("/vragen/aanmaken")}
                    />
                )}
            </div>
        </>
    );
}

export default QuestionFilter;
