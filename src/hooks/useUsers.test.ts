import { describe, expect, it } from 'vitest';
import { useUsers } from './useUsers';
import { ErrorTexts } from '../constants';
import { createAppUser } from '../models/user';
import type { RegisterUserValue } from '../models/user';

describe('Use users', () => {
    const user1: RegisterUserValue = { 
        name: 'User #1', 
        password: 'test', 
        repeatPassword: '', 
        username: 'user#1' 
    };
    const user2: RegisterUserValue = {
        age: 18,
        comment: 'Comment #2',
        name: 'User #2', 
        password: 'test123',
        profession: 'Profession #2', 
        repeatPassword: '', 
        username: 'user#2' 
    };
    const appUser1 = createAppUser({ 
        ...user1, 
        age: 12,
        comment: 'Comment #1',
        id: 0,
        profession: 'Profession #1'
    });
    const appUser2 = createAppUser({ ...user2, id: 2 });

    appUser1.admin = true;

    it('Create and get all', async () => {
        const { createUser, getUsers } = useUsers();

        await createUser(user1);
        await createUser(user2);

        const users = await getUsers();

        expect(users.length).toBe(2);
        expect(users[0]).toEqual({
            admin: true,
            age: 0,
            comment: '',
            id: 1,
            name: user1.name,
            profession: '',
            username: user1.username,            
        });
        expect(users[1]).toEqual(appUser2);
    });
    it('Try create same user', async () => {
        const { createUser } = useUsers();

        await expect(createUser(user1)).rejects.toThrow(ErrorTexts.userExist);
    });
    it('Update user', async () => {
        const { updateUser } = useUsers();

        await expect(updateUser(appUser1)).rejects.toThrow(ErrorTexts.userNotFound);
        appUser1.id = 1;
        await expect(updateUser(appUser1)).resolves.toEqual(appUser1);
    });
    it('Get user by id', async () => {
        const { getUserById } = useUsers();

        await expect(getUserById(3)).rejects.toThrow(ErrorTexts.userNotFound);
        await expect(getUserById(2)).resolves.toEqual(appUser2);
    });
    it('Remove user', async () => {
        const { getUsers, removeUser } = useUsers();

        await expect(removeUser(0)).rejects.toThrow(ErrorTexts.userNotFound);
        await expect(removeUser(2)).resolves.toBe(2);

        const users = await getUsers();

        expect(users.length).toBe(1);
    });
    it('Validate user', async () => {
        const { validate } = useUsers();

        await expect(validate('', '')).rejects.toThrow(ErrorTexts.invalidCreds);
        await expect(validate('user#1', '')).rejects.toThrow(ErrorTexts.invalidCreds);
        await expect(validate('user#1', 'test1')).rejects.toThrow(ErrorTexts.invalidCreds);        
        await expect(validate('user#1', 'test')).resolves.toEqual(appUser1);
    });
    it('Check change admin role', async () => {
        const { createUser, getUsers, removeUser } = useUsers();

        await createUser(user2);

        let users = await getUsers();
        
        expect(users[0].admin).toBeTruthy();
        expect(users[1].admin).toBeFalsy();

        removeUser(users[0].id);

        users = await getUsers();

        expect(users[0].admin).toBeTruthy();
    })
})