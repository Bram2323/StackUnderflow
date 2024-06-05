import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/stackoverflow-light.css";
import "./CodeHighlighter.css";

function CodeHighlighter({ markdown }) {
    // Highlight code blocks
    useEffect(() => {
        const codeBlocks = document.querySelectorAll("code.hljs");
        codeBlocks.forEach((block) => hljs.highlightElement(block));
    }, [markdown]);

    // Split markdown into code blocks and text
    const blocks = markdown.split(/(```[^`]*```)/gs);

    return (
        <div className="w-full">
            {blocks.map((block, index) =>
                block.startsWith("```") ? (
                    <pre key={index}>
                        <code className="hljs block overflow-x-auto whitespace-pre mt-2 rounded-lg max-h-[600px] bg-[#f1f2f3] p-2">
                            {block.replace(/^```|```$/g, "").trim()}
                        </code>
                    </pre>
                ) : (
                    <span key={index}>{block}</span>
                )
            )}
        </div>
    );
}

export default CodeHighlighter;
