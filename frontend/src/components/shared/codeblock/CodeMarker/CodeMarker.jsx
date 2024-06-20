import React from "react";

function CodeMarker({ object, setObject, selectionRange, setSelectionRange }) {
    const { text } = object;

    function handleMarkCodeBlock() {
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
            newText =
                beforeSelection +
                selectedText.replace(/^```|```$/g, "").trim() +
                afterSelection;
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
        <div className="w-full flex items-baseline mb-4 select-none">
            <p>Markeer als codeblock</p>
            <button
                type="button"
                className="bg-gray-200 text-gray-800 font-bold py-1 px-4 ml-2 transition duration-200 rounded-full hover:bg-gray-300 text-nowrap"
                onClick={handleMarkCodeBlock}
            >
                {"{ }"}
            </button>
        </div>
    );
}

export default CodeMarker;
