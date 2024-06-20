import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/stackoverflow-light.css";

function linkify(text) {
    const urlPattern =
        /(\b(?:https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    const parts = text.split(urlPattern);

    return parts.map((part, index) => {
        if (part.match(urlPattern)) {
            return (
                <a
                    className="text-[#12A8C0] hover:text-[#207890] underline"
                    key={index}
                    href={part}
                    rel="noopener noreferrer"
                >
                    {part}
                </a>
            );
        }
        return part;
    });
}

function ContentFormatter({ content }) {
    // Highlight code blocks
    useEffect(() => {
        const codeBlocks = document.querySelectorAll("code.hljs");
        codeBlocks.forEach((block) => hljs.highlightElement(block));
    }, [content]);

    // Split markdown into code blocks and text
    const blocks = content.split(/(```[^`]*```)/gs);

    return (
        <div className="w-full">
            {blocks.map((block, index) =>
                block.startsWith("```") ? (
                    <pre
                        key={index}
                        className="my-4 p-2 rounded-lg max-h-[600px] bg-white overflow-hidden"
                    >
                        <code className="hljs bg-white">
                            {block.replace(/^```|```$/g, "").trim()}
                        </code>
                    </pre>
                ) : (
                    <pre
                        className="overflow-auto whitespace-pre-wrap font-sans break-words"
                        key={index}
                    >
                        {linkify(block.trim())}
                    </pre>
                )
            )}
        </div>
    );
}

export default ContentFormatter;
