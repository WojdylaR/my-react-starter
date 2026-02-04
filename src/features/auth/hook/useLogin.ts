import { useMutation } from "@tanstack/react-query";
import { api } from "../../../infrastructure/client";
import { notifications } from "../../../shared/components/notification/notification";
import type { FormFieldsAuth } from "../authScemas";
import type { AxiosResponse } from "axios";
import type { ICredentialsResponse } from "../authInterface";
import { useCredentialsStore } from "../../../stores/credentialsStore";

export function useLogin() {
    
    const { setToken } = useCredentialsStore();

    return useMutation({
        mutationFn: ((data: FormFieldsAuth) => api.post('api/login_check', data)),
        onError: () => notifications.error('Identitfiants invalides. Veuillez réessayer.'),
        onSuccess: (response: AxiosResponse<ICredentialsResponse>) => {
            setToken(response.data);},
    })
}