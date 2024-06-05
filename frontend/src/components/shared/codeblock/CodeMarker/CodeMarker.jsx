import React, { useState } from "react";

function CodeMarker({ object, setObject, selectionRange, setSelectionRange }) {
    const [selectionError, setSelectionError] = useState("");
    const { text } = object;

    function handleMarkCodeBlock() {
        if (
            selectionRange.start === null ||
            selectionRange.end === null ||
            selectionRange.start === selectionRange.end
        ) {
            setSelectionError("Geen tekst geselecteerd");
            return;
        }
        if (selectionError) setSelectionError("");

        const beforeSelection = text.substring(0, selectionRange.start);
        const selectedText = text.substring(
            selectionRange.start,
            selectionRange.end
        );
        const afterSelection = text.substring(selectionRange.end);

        if (selectedText.startsWith("```") && selectedText.endsWith("```")) {
            setSelectionError(
                "De geselecteerde tekst is al gemarkeerd als code"
            );
            return;
        }

        const newText =
            beforeSelection + "```" + selectedText + "```" + afterSelection;

        setObject({
            ...object,
            text: newText,
        });
        setSelectionRange({ start: null, end: null });
    }
    return (
        <>
            <div className="w-full flex items-baseline justify-between">
                <p>
                    Selecteer je code en klik hier om te markeren als een
                    codeblock{" "}
                </p>
                <button
                    type="button"
                    className="relative bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded-full"
                    onClick={handleMarkCodeBlock}
                >
                    {"{ }"}
                </button>
            </div>
            {selectionError && (
                <p className="question-form-error">{selectionError}</p>
            )}
        </>
    );
}

export default CodeMarker;
