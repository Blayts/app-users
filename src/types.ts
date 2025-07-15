export type UserValue = {
    age: number;
    comment: string;
    name: string;
    password: string;
    profession: string;
    username: string;
};
export type AppUserValue = Omit<UserValue, 'password'>;
export type RegisterUserValue = Pick<UserValue, 'name' | 'password' | 'username'> & 
    Partial<Pick<UserValue, 'age' | 'comment' | 'profession'>> & 
    { repeatPassword: UserValue['password'] };
