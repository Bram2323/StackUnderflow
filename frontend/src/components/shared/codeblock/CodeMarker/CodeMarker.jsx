import React from "react";

function CodeMarker({ object, setObject, selectionRange, setSelectionRange }) {
    const { text } = object;

    function handleMarkCodeBlock() {
        console.log(selectionRange);
        if (
            selectionRange.start === null ||
            selectionRange.end === null ||
            selectionRange.start === selectionRange.end
        ) {
            return;
        }

        const beforeSelection = text.substring(0, selectionRange.start);
        const selectedText = text.substring(
            selectionRange.start,
            selectionRange.end
        );
        const afterSelection = text.substring(selectionRange.end);

        let newText = "";
        if (
            selectedText.startsWith("```\n") &&
            selectedText.endsWith("\n```")
        ) {
            // remove the backticks when they're already there
            newText = selectedText.replace(/^```|```$/g, "").trim();
        } else {
            newText =
                beforeSelection +
                "```\n" +
                selectedText +
                "\n```" +
                afterSelection;
        }

        setObject({
            ...object,
            text: newText,
        });
        setSelectionRange({ start: null, end: null });
    }
    return (
        <div className="w-full flex items-baseline justify-between">
            <p>
                Selecteer je code en klik hier om te markeren als een codeblock{" "}
            </p>
            <button
                type="button"
                className="bg-gray-200 text-gray-800 font-bold py-1 px-4 transition duration-200 rounded-full hover:bg-gray-300"
                onClick={handleMarkCodeBlock}
            >
                {"{ }"}
            </button>
        </div>
    );
}

export default CodeMarker;
