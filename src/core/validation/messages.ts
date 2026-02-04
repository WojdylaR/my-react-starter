export const validationMessages = {
    required: "Champs obligatoire",
    invalidEmail: "Email invalide",
    minLength: (min: number) => `Doit contenir au moins ${min} caractères`,
    maxLength: (max: number) => `Doit contenir au maximum ${max} caractères`,
    passwordMismatch: "Les mots de passe ne correspondent pas",
    wrongPassword: "Mot de passe incorrect",
};