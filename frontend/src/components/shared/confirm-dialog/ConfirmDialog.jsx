import React from "react";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
                <p className="mb-4 font-bold text-center">{message}</p>
                <div className="flex justify-around">
                    <button
                        className="text-green-600 font-bold py-2 px-4 rounded mr-2"
                        onClick={onConfirm}
                    >
                        Ja
                    </button>
                    <button
                        className="text-red-600 font-bold py-2 px-4 rounded mr-2"
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
