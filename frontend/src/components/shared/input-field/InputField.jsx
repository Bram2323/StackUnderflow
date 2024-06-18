import "./InputField.css";

function InputField({
    label,
    text,
    onTextChanged,
    placeHolder,
    onBlur,
    onSubmit,
    hidden = false,
    maxLength,
}) {
    return (
        <div className="input-field-container">
            {label != undefined ? <p>{label}</p> : null}
            <input
                className="input-field"
                value={text}
                onChange={(event) => onTextChanged(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key == "Enter" && onSubmit) onSubmit();
                }}
                onBlur={() => {
                    if (onBlur) onBlur();
                }}
                type={hidden ? "password" : "text"}
                placeholder={placeHolder}
                maxLength={maxLength}
            />
        </div>
    );
}

export default InputField;
