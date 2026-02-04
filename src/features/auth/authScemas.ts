import {z} from "zod";
import commonSchemas from "../../core/validation/schemas";

export const authSchemas = z.object({
    username: commonSchemas.username,
    password: commonSchemas.password,
})

export type FormFieldsAuth = z.infer<typeof authSchemas>;