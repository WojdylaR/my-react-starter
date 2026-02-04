import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchemas, type FormFieldsAuth } from "../authScemas";
import { useLogin } from "../hook/useLogin";
import { useGetUser } from "../hook/useGetUser";
import { EmailField, PasswordField } from "../../../shared/components/formField/formFieldInput";
import { FormFieldButton } from "../../../shared/components/formField/formFieldButton";
import { notifications } from "../../../shared/components/notification/notification";

function AuthForm() {

    const {mutateAsync} = useLogin();
    const {refetch} = useGetUser();

    const onSubmit: SubmitHandler<FormFieldsAuth> = async (data) => {
        try {
        await mutateAsync(data)
        await refetch()}
        catch (error) {
            console.error("Login failed", error);
            notifications.error("Échec de la connexion. Veuillez réessayer.");
        }
    }

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFieldsAuth>({
        defaultValues: {},
        resolver: zodResolver(authSchemas)
    })

    return(
        <form noValidate className={"form"} onSubmit={handleSubmit(onSubmit)}>
            <h4>Connexion</h4>

            <EmailField label="Email" error={errors.username?.message} register={register("username")} />
            <PasswordField label="Mot de passe" error={errors.password?.message} register={register("password")} />

            <FormFieldButton label="Se connecter" isSubmitting={isSubmitting} />

        </form>
    )
}

export default AuthForm;