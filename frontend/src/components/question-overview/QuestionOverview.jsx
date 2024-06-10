import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import QuestionList from "../shared/question-list/QuestionList.jsx";

function QuestionOverview() {
    const [questions, setQuestions] = useState();
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterQuery, setFilterQuery] = useState("");

    useEffect(() => {
        ApiService.get("questions").then((response) => {
            setQuestions(response.data);
            setFilteredQuestions(response.data);
        });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        ApiService.get(
            `questions/search?title=${formData.get(
                "search"
            )}&sort-by=${filterQuery}`
        ).then((response) => setFilteredQuestions(response.data));
    };

    if (questions === undefined) {
        return <></>;
    }

    return (
        <div className=" w-3/4 ">
            <div>
                <form method="post" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        name="search"
                    />
                    <select
                        onChange={(e) => setFilterQuery(e.target.value)}
                        name="filters"
                    >
                        <option value="date-desc">
                            Creation date descending
                        </option>
                        <option value="date-asc">
                            Creation date ascending
                        </option>
                        <option value="most-answers">Most answers</option>
                        <option value="least-answers">Least answers</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <QuestionList questions={filteredQuestions} />
        </div>
    );
}

export default QuestionOverview;
