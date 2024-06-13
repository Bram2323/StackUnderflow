import React, { useState } from "react";
import ApiService from "../../services/ApiService";
import "./QuestionForm.css";
import InputField from "../shared/input-field/InputField";
import { useNavigate } from "react-router-dom";
import CodeMarker from "../shared/codeblock/CodeMarker/CodeMarker";

function QuestionForm() {
    const [question, setQuestion] = useState({ title: "", text: "" });
    const [error, setError] = useState("");
    const [selectionRange, setSelectionRange] = useState({
        start: null,
        end: null,
    });

    const navigate = useNavigate();

    function handleSelect(e) {
        e.stopPropagation();
        const { selectionStart, selectionEnd } = e.target;
        if (selectionStart !== null && selectionEnd !== null) {
            setSelectionRange({
                start: selectionStart,
                end: selectionEnd,
            });
        }
    }

    function handleSaveQuestion(e) {
        e.preventDefault();
        if (!question.title.trim()) {
            setError("Titel mag niet leeg zijn");
            return;
        }
        if (!question.text.trim()) {
            setError("Beschrijving mag niet leeg zijn");
            return;
        }

        ApiService.post("questions", question).then((response) =>
            navigate("/vragen/" + response.data.id)
        );
    }

    function handleTabKeyPress(e) {
        e.stopPropagation();
        e.preventDefault();
        const { selectionStart, value } = e.target;

        const newValue =
            value.substring(0, selectionStart) +
            "\t" +
            value.substring(selectionStart);

        setQuestion({
            ...question,
            text: newValue,
        });

        // Use setTimeout to set the cursor position after the DOM update
        setTimeout(() => {
            const newCursorPosition = selectionStart + 1;
            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    }

    return (
        <div className="question-form">
            <div className="question-form-container">
                <h1>Stel een vraag</h1>
                <form>
                    <InputField
                        label={"Titel"}
                        text={question.title}
                        onTextChanged={(text) =>
                            setQuestion({
                                ...question,
                                title: text,
                            })
                        }
                    />
                    <label>Beschrijf je probleem</label>
                    <textarea
                        className="border-2 border-[#5c5c5c] rounded-lg bg-[#f3f3f3] text-base w-full h-72 mb-2 p-2"
                        value={question.text}
                        onMouseUp={handleSelect}
                        onSelect={handleSelect}
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                text: e.target.value,
                            });
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Tab") {
                                handleTabKeyPress(e);
                            }
                        }}
                    ></textarea>
                    <CodeMarker
                        object={question}
                        setObject={setQuestion}
                        selectionRange={selectionRange}
                        setSelectionRange={setSelectionRange}
                    />
                    <button
                        className="bg-blue-500 text-white rounded-full w-48 p-3 transition duration-200 my-2 hover:bg-blue-700"
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
