import { describe, expect, it } from 'vitest';
import { useAuth } from './useAuth';
import { useUsers } from './useUsers';
import { ErrorTexts } from '../constants';
import type { RegisterUserValue } from '../models/user';

describe('Use auth', () => {   
    it('Login', async () => {
        const { currentUser, logged, login } = useAuth();
        const { createUser } = useUsers();
        const user: RegisterUserValue = {
            name: 'Username', 
            password: 'test', 
            repeatPassword: '', 
            username: 'user' 
        };

        const appUser = await createUser(user);

        await expect(login(user.username, '123')).rejects.toThrow(ErrorTexts.invalidCreds);        
        await login(user.username, user.password);

        expect(logged.value).toBeTruthy();
        expect(currentUser.value).toEqual(appUser);
    });
    it('Logout', async () => {
        const { currentUser, logged, logout } = useAuth();

        await logout();
        expect(logged.value).toBeFalsy();
        expect(currentUser.value).toBeUndefined();
    });    
})