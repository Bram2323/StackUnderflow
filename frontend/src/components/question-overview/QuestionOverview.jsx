import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import User from "../shared/User/User";
import "./QuestionOverview.css";

/*
    ways to filter:
    - search query
    - creationdate (newest/oldest)
    - id (is default)
    - title (alphabetically???)
*/

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

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get("questions").then((response) => setQuestions(response.data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    let filteredData = questions;
    filteredData = questions.filter((item) =>
      item.title.toLowerCase().includes(formData.get("search").toLowerCase())
    );
    setFilteredQuestions(filteredData);
  };

  if (questions === undefined) {
    return <></>;
  }

  const dataToDisplay =
    filteredQuestions.length > 0 ? filteredQuestions : questions;

  return (
    <div className=" w-3/4 ">
      <div>
        <form method="post" onSubmit={handleSearch}>
          <input type="text" placeholder="Search..." name="search" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {dataToDisplay.map((question) => (
          <div
            className=" cursor-pointer bg-gray-300 pt-2 pb-2 pl-2 mt-2"
            onClick={() => navigate(`/vragen/${question.id}`)}
            key={question.id}
          >
            <div className="question-title">{question.title}</div>
            <div className=" flex items-center gap-1">
              <p>geplaatst door:</p> <User user={question.user} />
            </div>
            <div>datum: {formatDate(question.date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionOverview;
