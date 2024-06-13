import { useState } from "react";
import UserService from "../../../services/UserService";
import TextareaAutosize from "react-textarea-autosize";
import CodeMarker from "../../shared/codeblock/CodeMarker/CodeMarker";
import ApiService from "../../../services/ApiService";

function AnswerForm({ questionId, answers, setAnswers }) {
    const [answer, setAnswer] = useState({ question: questionId, text: "" });
    const [error, setError] = useState(null);
    const [selectionRange, setSelectionRange] = useState({
        start: null,
        end: null,
    });

    function handlePost() {
        if (answer.text.trim().length == 0) {
            setError("Antwoord kan niet leeg zijn!");
            return;
        }
        ApiService.post("answers", answer).then((response) => {
            const newAnswer = response.data;
            setAnswers([...answers, newAnswer]);
            setAnswer({ question: questionId, text: "" });
        });
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
            <div className="w-full flex flex-col gap-[10px] bg-gray-100 p-[15px] rounded-[10px] border border-solid border-gray-400">
                {!UserService.isLoggedIn() ? (
                    <p>Log in om te antwoorden op deze vraag!</p>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <h2 className="pb-1">Geef je antwoord:</h2>
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
                            />
                            <CodeMarker
                                object={answer}
                                setObject={setAnswer}
                                selectionRange={selectionRange}
                                setSelectionRange={setSelectionRange}
                            />
                            <button
                                className="w-fit bg-blue-500 text-white rounded-full p-3 px-5 transition duration-200 my-2 hover:bg-blue-700"
                                onClick={handlePost}
                            >
                                Post
                            </button>
                            {error && <p className="text-[#FF0000]">{error}</p>}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default AnswerForm;
