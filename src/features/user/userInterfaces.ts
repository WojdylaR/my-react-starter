export interface IUserResponse {
    uuid: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    username: string;
}

export type IUser = Omit<IUserResponse, 'createdAt' | 'updatedAt' > & {
    
};

export type IUserStore = IUser & {
    setUser: (user: IUser) => void;
};