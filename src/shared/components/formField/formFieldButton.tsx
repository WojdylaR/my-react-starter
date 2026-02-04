import type { ButtonProps } from "../formField/formFieldInterface";

export const FormFieldButton = ({label = "Submit", isSubmitting, disabled = false}: ButtonProps) => {

    return (
        <button className={`submit-button ${isSubmitting || disabled ? "disabled" : ""}`} disabled={isSubmitting || disabled} type="submit">
            {isSubmitting ? "Chargement..." : label}
        </button>
    )
}