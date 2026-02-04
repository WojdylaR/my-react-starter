
import { useCredentialsStore } from "../../../stores/credentialsStore";
import { useUsersStore } from "../../../stores/userStore";

export function useLogout() {

    const { setToken } = useCredentialsStore();
    const { setUser } = useUsersStore();

    const logout = () => {
        setToken({ token: '', refresh_token: '' });
        setUser({
             uuid: '',
    email: '',
    username: '',
})
    }

    return logout
}