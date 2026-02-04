import { z } from "zod";
import { validationMessages } from "./messages";

const commonSchemas = {
    username: z.string().min(1, { message: validationMessages.required }),
    email: z.string().min(1, { message: validationMessages.required }).email( validationMessages.invalidEmail),
    password: z.string().min(1, { message: validationMessages.required }),
}

export default commonSchemas;