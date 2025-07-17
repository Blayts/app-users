export type UserValue = {
    admin: boolean;
    age: number;
    comment: string;
    id: number;
    name: string;
    password: string;
    profession: string;
    username: string;
};
export type AppUserValue = Omit<UserValue, 'password'>;
export type RegisterUserValue = Pick<UserValue, 'name' | 'password' | 'username'> & 
    Partial<Pick<UserValue, 'age' | 'comment' | 'profession'>> & 
    { repeatPassword: UserValue['password'] };

export function createAppUser(data: Record<string, number | string>): AppUserValue {
    return {
        admin: false,
        age: +data.age || 0,
        comment: data.comment?.toString() ?? '',
        id: +data.id,
        name: data.name?.toString() ?? '',
        profession: data.profession?.toString() ?? '',
        username: data.username?.toString() ?? '',
    };
}

export function createUser(data: Record<string, number | string>): UserValue {
    return { ...createAppUser(data), password: data.password.toString() };
}