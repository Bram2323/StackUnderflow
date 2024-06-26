import { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import TextareaAutosize from "react-textarea-autosize";
import CodeMarker from "../../shared/formatter/CodeMarker/CodeMarker";
import ApiService from "../../../services/ApiService";
import Button from "../../shared/button/Button";
import { useNavigate, useLocation } from "react-router-dom";

function AnswerForm({
    questionId,
    addAnswer,
    isEditing = false,
    setIsEditing,
    answerToEdit,
    isAnswerOwner,
    updateAnswer,
}) {
    const [answer, setAnswer] = useState({ question: questionId, text: "" });
    const [error, setError] = useState(null);
    const [selectionRange, setSelectionRange] = useState({
        start: null,
        end: null,
    });
    const navigate = useNavigate();
    const location = useLocation();
    const MAX_TEXT_CHARACTERS = 30000;

    useEffect(() => {
        if (isEditing) setAnswer(answerToEdit);
    }, []);

    function handleSaveAnswer() {
        if (answer.text.trim().length == 0) {
            setError("Antwoord kan niet leeg zijn!");
            return;
        }
        if (isEditing) {
            if (!UserService.isLoggedIn() || !isAnswerOwner) return;
            ApiService.patch("answers/" + answer.id, {
                text: answer.text,
            }).then((response) => {
                const updatedAnswer = response.data;
                updateAnswer(updatedAnswer);
                setIsEditing(false);
            });
        } else {
            ApiService.post("answers", answer).then((response) => {
                const newAnswer = response.data;
                addAnswer(newAnswer);
                setAnswer({ ...answer, text: "" });
            });
        }
    }

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

    function handleTabKeyPress(e) {
        e.stopPropagation();
        e.preventDefault();
        const { selectionStart, value } = e.target;

        const newValue =
            value.substring(0, selectionStart) +
            "\t" +
            value.substring(selectionStart);

        setAnswer({
            ...answer,
            text: newValue,
        });

        // Use setTimeout to set the cursor position after the DOM update
        setTimeout(() => {
            const newCursorPosition = selectionStart + 1;
            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    }

    return (
        <>
            <div className="w-full shadow flex flex-col  bg-gray-100 p-[15px] rounded-[10px] border border-solid border-gray-400">
                {!UserService.isLoggedIn() ? (
                    <p>
                        <a
                            className="font-bold text-[#12a8c0]"
                            href="./inloggen"
                            onClick={() => {
                                const currentPath = location.pathname;
                                navigate("/inloggen", {
                                    state: {
                                        prevPath: currentPath,
                                    },
                                });
                            }}
                        >
                            Log in
                        </a>{" "}
                        om te antwoorden op deze vraag!
                    </p>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <h2 className="pb-1">
                                {isEditing
                                    ? "Bewerk je antwoord:"
                                    : "Geef je antwoord:"}
                            </h2>
                            <TextareaAutosize
                                className="border-2 min-h-[4.25rem] max-h-[20rem] border-[#5c5c5c] rounded-lg bg-white text-base w-full mb-2 p-2 resize-none"
                                value={answer.text}
                                onMouseUp={handleSelect}
                                onSelect={handleSelect}
                                onChange={(e) =>
                                    setAnswer({
                                        ...answer,
                                        text: e.target.value,
                                    })
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Tab") {
                                        handleTabKeyPress(e);
                                    }
                                }}
                                maxLength={MAX_TEXT_CHARACTERS}
                            />

                            <div className="flex justify-between ">
                                <CodeMarker
                                    object={answer}
                                    setObject={setAnswer}
                                    selectionRange={selectionRange}
                                    setSelectionRange={setSelectionRange}
                                />
                                <p
                                    className={`text-xs text-nowrap ${
                                        answer.text.length ==
                                        MAX_TEXT_CHARACTERS
                                            ? "text-red-500"
                                            : ""
                                    }`}
                                >{`${answer.text.length} / ${MAX_TEXT_CHARACTERS}`}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                text={
                                    isEditing ? "Opslaan" : "Plaats je antwoord"
                                }
                                onClick={handleSaveAnswer}
                            />
                            {error && (
                                <p className="text-[#FF0000] mt-2">{error}</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default AnswerForm;
