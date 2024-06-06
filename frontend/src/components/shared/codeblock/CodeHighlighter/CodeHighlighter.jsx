import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/stackoverflow-light.css";

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
                    <pre
                        key={index}
                        className="my-4 p-2 rounded-lg max-h-[600px] bg-[#f1f2f3] overflow-auto"
                    >
                        <code className="hljs bg-[#f1f2f3]">
                            {block.replace(/^```|```$/g, "").trim()}
                        </code>
                    </pre>
                ) : (
                    <pre
                        className="overflow-auto whitespace-pre-wrap font-sans"
                        key={index}
                    >
                        {block.trim()}
                    </pre>
                )
            )}
        </div>
    );
}

export default CodeHighlighter;
