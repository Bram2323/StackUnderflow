import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import QuestionList from "../shared/question-list/QuestionList.jsx";

function formatDate(date) {
    const creationDate = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "Europe/Amsterdam",
    }).format(creationDate);

    return formattedDate;
}

function QuestionOverview() {
    const [questions, setQuestions] = useState();
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

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

        if (formData.get("search").length === 0) {
            setFilteredQuestions(questions);
            return;
        }

        ApiService.get(`questions/search?title=${formData.get("search")}`).then(
            (response) => setFilteredQuestions(response.data)
        );
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
                    <button type="submit">Submit</button>
                </form>
            </div>
            <QuestionList questions={filteredQuestions} />
        </div>
    );
}

export default QuestionOverview;
