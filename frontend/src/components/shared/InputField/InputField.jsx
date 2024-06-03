import "./InputField.css";

function InputField({label, text, onTextChanged, onSubmit, hidden = false}) {
    return (
        <div className="input-field-container">
            <p>{label}</p>
            <input 
                className="input-field"
                value={text}
                onChange={(event) => onTextChanged(event.target.value)}
                onKeyDown={(event) => {if (event.key == "Enter" && onSubmit != undefined) onSubmit()}}
                type={hidden ? "password" : "text"}
            />
        </div>
    );
}

export default InputField;
