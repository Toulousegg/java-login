function Input({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false
}) {


    return (

        <div>


            <label>

                {label}

            </label>



            <input

                type={type}

                name={name}

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                required={required}

            />


        </div>

    );

}



export default Input;