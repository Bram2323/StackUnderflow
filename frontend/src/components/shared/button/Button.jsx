import React from "react";

function Button({ text, onClick, isLoginOrOut }) {
    return isLoginOrOut ? (
        <button
            className="bg-white select-none border text-nowrap border-[#12A8C0] hover:bg-[#d2f8fe] px-5 h-11 transition-all duration-200 cursor-pointer rounded-[50px] text-black"
            onClick={onClick}
        >
            {text}
        </button>
    ) : (
        <button
            className="bg-[#12A8C0] select-none text-nowrap hover:bg-[#207890] px-5 h-11 transition-all duration-200 cursor-pointer rounded-[50px] text-white"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;
