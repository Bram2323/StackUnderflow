import React from "react";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="mb-4 font-bold text-center">{message}</p>
                <div className="flex justify-around">
                    <button
                        className="text-green-600 font-bold py-2 px-4 w-20 border-2 border-gray-300 rounded-full mr-2 transition-all hover:bg-neutral-50"
                        onClick={onConfirm}
                    >
                        Ja
                    </button>
                    <button
                        className="text-red-600 font-bold py-2 px-4 w-20 border-2 border-gray-300 rounded-full mr-2 transition-all hover:bg-neutral-50"
                        onClick={onCancel}
                    >
                        Nee
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
