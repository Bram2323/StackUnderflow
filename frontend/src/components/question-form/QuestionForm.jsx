import React, { useState } from "react";
import ApiService from "../../services/ApiService";
import "./QuestionForm.css";
import InputField from "../shared/InputField/InputField";
import { useNavigate } from "react-router-dom";

function QuestionForm() {
    const [newQuestion, setNewQuestion] = useState({ title: "", text: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSaveQuestion(e) {
        e.preventDefault();
        if (!newQuestion.title.trim()) {
            setError("Titel mag niet leeg zijn");
            return;
        }
        if (!newQuestion.text.trim()) {
            setError("Beschrijving mag niet leeg zijn");
            return;
        }

        ApiService.post("questions", newQuestion).then((response) =>
            navigate("/vragen/" + response.data.id)
        );
    }

    return (
        <div className="question-form">
            <div className="question-form-container">
                <h1>Stel een vraag</h1>
                <form>
                    <InputField
                        label={"Titel"}
                        text={newQuestion.title}
                        onTextChanged={(text) =>
                            setNewQuestion({
                                ...newQuestion,
                                title: text,
                            })
                        }
                    />
                    <label>Beschrijf je probleem</label>
                    <textarea
                        className="border-2 border-[#5c5c5c] rounded-lg bg-[#f3f3f3] text-base w-full h-52 mb-2 p-2"
                        value={newQuestion.text}
                        onChange={(e) =>
                            setNewQuestion({
                                ...newQuestion,
                                text: e.target.value,
                            })
                        }
                    ></textarea>
                    <button
                        className="bg-blue-500 text-white rounded-full w-48 p-3 transition duration-200"
                        onClick={handleSaveQuestion}
                    >
                        Plaats je vraag
                    </button>
                    {error && <p className="question-form-error">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default QuestionForm;
