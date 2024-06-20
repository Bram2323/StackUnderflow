import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import InputField from "../input-field/InputField";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import "./QuestionFilter.css";
import UserService from "../../../services/UserService";
import Dropdown from "../dropdown/Dropdown";

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

    const orderOptions = [
        { value: "date-desc", text: "Nieuwste vragen" },
        { value: "date-asc", text: "Oudste vragen" },
        { value: "most-answers", text: "Meeste antwoorden" },
        { value: "least-answers", text: "Minste antwoorden" },
    ];

    const categoryOptions = [
        { value: "", text: "Alle categorieën" },
        { value: "general", text: "Algemeen" },
        { value: "data", text: "Data Engineering / Science" },
        { value: "cloud", text: "Cloud Engineering" },
        { value: "cyber", text: "Cyber Security" },
        { value: "java", text: "Java" },
    ];

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
                    <Dropdown
                        value={orderQuery}
                        setValue={handleOrderChange}
                        options={orderOptions}
                        name={"orders"}
                    />
                    <Dropdown
                        value={categoryQuery}
                        setValue={handleCategoryChange}
                        options={categoryOptions}
                        name={"categories"}
                    />
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
