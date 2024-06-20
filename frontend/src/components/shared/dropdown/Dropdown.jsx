function Dropdown({ value, setValue, options, name, className }) {
    return (
        <>
            <select
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                name={name}
                value={value}
                className={
                    "select-none border border-black rounded-lg p-1" +
                    " " +
                    className
                }
            >
                {options.map((option, index) => (
                    <option
                        key={index}
                        value={option.value}
                        disabled={option.hidden}
                        hidden={option.hidden}
                    >
                        {option.text}
                    </option>
                ))}
            </select>
        </>
    );
}

export default Dropdown;
