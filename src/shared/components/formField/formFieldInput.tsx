import type {InputProps} from "./formFieldInterface";
import { MdAlternateEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff  } from "react-icons/io";






export function EmailField ({label = "Email", error, register}: InputProps) {

    return (
        <div className="input-field-container">
            <div className="input-with-icon">
                <MdAlternateEmail className="input-icon"/>
                <input {...register} type="email" className="input-field" name="username" placeholder={label} />
            </div>
            { error && <span className="error">{error}</span>}
        </div>
    )
}

export function PasswordField ({label = "Mot de passe", error, register, autoComplete = 'current-password'}: InputProps) {
    const [hide, setHide] = useState<boolean>(true);

    return (
        <div className="input-field-container">
            <div className="input-with-icon password-field">
                <FaKey className="input-icon"/>
                <input {...register} type={hide ? "password" : "text"} autoComplete={autoComplete} className="input-field" name="password" placeholder={label} />
    
                <button className='hide-button' onMouseUp={() => setHide(true)} onMouseDown={() => setHide(false)} type="button">
                    { hide ? <IoIosEyeOff className=""/> : <IoIosEye className=""/> }
                </button>
            </div>
            
            { error && <span className="error">{error}</span>}
        </div>
    )
}