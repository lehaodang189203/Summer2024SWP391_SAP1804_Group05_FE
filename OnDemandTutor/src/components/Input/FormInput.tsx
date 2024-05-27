import { useState } from "react";
const FormInput = (props : any) =>{
    const[focused,setFocused] = useState(false);
    const {label, onChange, errorMessage, id, ...inputProps} = props;
    
    const handleFocus = () =>{
        setFocused(true);
    };
    return(
        <div className="formInput">
            <label>
                {label}
                </label>
            <input 
            {...inputProps} 
            onChange={onChange} 
            onBlur={handleFocus} 
            focused={focused.toString()} 
            onFocus= { () =>
            inputProps.name === "confirmPassword" && setFocused(true)}
            />
            <span>{errorMessage}</span>
        </div>
    )
}
export default FormInput;