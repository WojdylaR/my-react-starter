import axios from 'axios';
import { useCredentialsStore } from '../stores/credentialsStore';
import { notifications } from '../shared/components/notification/notification';
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const { token } = useCredentialsStore.getState();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && 
        !originalRequest.url?.includes('/token/refresh')) {
      
      const { refresh_token } = useCredentialsStore.getState();
      
      if (refresh_token) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_HOST}/api/token/refresh`,
            { refresh_token }
          );
          
          useCredentialsStore.setState({ 
            token: data.token,
            refresh_token: data.refresh_token 
          });
          
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return api.request(originalRequest);
          
        } catch (refreshError) {
        //   useCredentialsStore.getState().logout?.();
          notifications.warning("Session expirée. Veuillez vous reconnecter.");
          return Promise.reject(refreshError);
        }
      } else {
        notifications.warning("Session expirée. Veuillez vous reconnecter.");
      }
    }
    
    return Promise.reject(error);
  }
);