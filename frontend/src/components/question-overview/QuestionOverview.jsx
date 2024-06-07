import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import "./QuestionOverview.css";
import QuestionItem from "../shared/question-item/QuestionItem.jsx";

/*
    ways to filter:
    - [DONE] search query
    - creationdate (newest/oldest)
    - [DEFAULT] id (is default)
    - title (alphabetically?)
*/

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
            <div>
                {filteredQuestions.map((question, index) => (
                    <QuestionItem question={question} key={index} />
                ))}
            </div>
        </div>
    );
}

export default QuestionOverview;
