import type { UseFormRegisterReturn } from "react-hook-form";


export interface InputProps {
    label?: string;
    error?: string;
    register: UseFormRegisterReturn;
    name?: string;
    autoComplete?: string;
}

export interface ButtonProps {
    label?: string;
    disabled?: boolean;
    isSubmitting?: boolean;
    onClick?: () => void;
}