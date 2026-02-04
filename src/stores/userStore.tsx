import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type { IUser, IUserStore } from '../features/user/userInterfaces'

export const useUsersStore = create<IUserStore>()(persist((set) => ({
    uuid: '',
    email: '',
    username: '',
    setUser: (user: IUser) => set({
        uuid: user.uuid,
        email: user.email,
        username: user.username,
    }),
}), {
    name :'userStore',
    partialize: (state) => ({
        uuid: state.uuid,
        email: state.email,
        username: state.username,
      }),
}))