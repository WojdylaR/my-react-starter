import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type { ICredentials } from '../infrastructure/types'


export const useCredentialsStore = create<ICredentials>()(persist((set) => ({
    token: '',
    refresh_token: '',
    setToken: (credentials) => set(credentials),
}), {
    name :'credentialsStore',
     partialize: (state) => ({
        token: state.token,
        refresh_token: state.refresh_token,
      }),
}))