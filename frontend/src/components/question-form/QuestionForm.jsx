import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import UserService from "../../services/UserService";
import "./QuestionForm.css";
import InputField from "../shared/input-field/InputField";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import CodeMarker from "../shared/formatter/CodeMarker/CodeMarker";
import Button from "../shared/button/Button";
import Dropdown from "../shared/dropdown/Dropdown";

function QuestionForm() {
    const [question, setQuestion] = useState({
        title: "",
        text: "",
        category: "",
    });
    const [error, setError] = useState("");
    const [selectionRange, setSelectionRange] = useState({
        start: null,
        end: null,
    });

    const MAX_TITLE_CHARACTERS = 150;
    const MAX_TEXT_CHARACTERS = 30000;

    const navigate = useNavigate();
    const location = useLocation();

    const { editMode, questionId, isQuestionOwner } = location.state || {
        editMode: false,
        questionId: null,
        isQuestionOwner: false,
    };

    const categoryOptions = [
        { value: "", text: "Selecteer een categorie", hidden: true },
        { value: "GENERAL", text: "Algemeen" },
        { value: "DATA", text: "Data Engineering / Science" },
        { value: "CLOUD", text: "Cloud Engineering" },
        { value: "CYBER", text: "Cyber Security" },
        { value: "JAVA", text: "Java" },
    ];

    useEffect(() => {
        if (editMode) {
            ApiService.get("questions/" + questionId).then((response) => {
                setQuestion(response.data);
            });
        }
    }, []);

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
        if (!question.category) {
            setError("Kies een categorie");
            return;
        }

        if (editMode) {
            if (!UserService.isLoggedIn() || !isQuestionOwner) return;
            ApiService.patch("questions/" + questionId, question).then(
                (response) => navigate("/vragen/" + response.data.id)
            );
        } else {
            ApiService.post("questions", question).then((response) =>
                navigate("/vragen/" + response.data.id)
            );
        }
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

    if (!UserService.isLoggedIn()) return <Navigate to={"/"} />;

    return (
        <div className="question-form">
            <div className="question-form-container">
                <h1>{editMode ? "Bewerk je vraag" : "Stel een vraag"}</h1>
                <form>
                    <div className="flex flex-col items-end">
                        <InputField
                            label={"Titel"}
                            text={question.title}
                            onTextChanged={(text) =>
                                setQuestion({
                                    ...question,
                                    title: text,
                                })
                            }
                            maxLength={MAX_TITLE_CHARACTERS}
                        />

                        <p
                            className={`text-xs ${
                                question.title.length == MAX_TITLE_CHARACTERS
                                    ? "text-red-500"
                                    : ""
                            }`}
                        >{`${question.title.length} / ${MAX_TITLE_CHARACTERS}`}</p>
                    </div>

                    <label>Beschrijf je probleem</label>
                    <div className="flex flex-col items-end">
                        <TextareaAutosize
                            className=" min-h-[150px] max-h-[300px] border-2 border-[#5c5c5c] rounded-lg bg-[#f3f3f3] text-base w-full h-72 mb-2 p-2"
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
                            maxLength={MAX_TEXT_CHARACTERS}
                        ></TextareaAutosize>
                    </div>

                    <div className="flex justify-between">
                        <CodeMarker
                            object={question}
                            setObject={setQuestion}
                            selectionRange={selectionRange}
                            setSelectionRange={setSelectionRange}
                        />
                        <p
                            className={`text-xs text-nowrap ${
                                question.text.length == MAX_TEXT_CHARACTERS
                                    ? "text-red-500"
                                    : ""
                            }`}
                        >{`${question.text.length} / ${MAX_TEXT_CHARACTERS}`}</p>
                    </div>
                    <div className="flex flex-col items-start">
                        <p>Categorie</p>
                        <Dropdown
                            value={question.category}
                            setValue={(value) =>
                                setQuestion({
                                    ...question,
                                    category: value,
                                })
                            }
                            options={categoryOptions}
                            name={"categories"}
                            className={"mb-6"}
                        />
                        {error && (
                            <p className="question-form-error">{error}</p>
                        )}
                        <Button
                            text={editMode ? "Opslaan" : "Plaats je vraag"}
                            onClick={handleSaveQuestion}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuestionForm;
