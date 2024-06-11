import "./InputField.css";

function InputField({label, text, onTextChanged, placeHolder, onSubmit, hidden = false}) {
    return (
        <div className="input-field-container">
            {label != undefined ? <p>{label}</p> : null}
            <input 
                className="input-field"
                value={text}
                onChange={(event) => onTextChanged(event.target.value)}
                onKeyDown={(event) => {if (event.key == "Enter" && onSubmit != undefined) onSubmit()}}
                type={hidden ? "password" : "text"}
                placeholder={placeHolder}
            />
        </div>
    );
}

export default InputField;
