import { useQuery } from '@tanstack/react-query';
import { api } from '../../../infrastructure/client';
import type { IUserResponse } from '../../user/userInterfaces';
import type { AxiosResponse } from 'axios';
import { useUsersStore } from '../../../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../../../shared/components/notification/notification';

export function useGetUser() {

    const navigate = useNavigate();
    const { setUser } = useUsersStore();

    return useQuery({
        queryKey: ['user-find'],
        enabled: false,
        queryFn: () => api.get(`api/user/profile`)
        .then((response: AxiosResponse<IUserResponse>) => {
            setUser({
                uuid: response.data.uuid,
                email: response.data.email,
                username: response.data.username,
            })
            notifications.success('Connexion réussie !');
            navigate('/signboard');
        })
    })
}