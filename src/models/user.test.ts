import { describe, expect, it } from 'vitest';
import { createAppUser, createUser } from './user';

describe('User model', () => {   
    it('Create app user', () => {
        const data = {
            age: 12,
            comment: 'Comment',
            id: 1,
            name: 'Name',
            profession: 'Profession',
            username: 'Username',
        };

        expect(createAppUser(data)).toEqual(data);
    });    
    it('Create user', () => {
        const data = {
            age: 12,
            comment: 'Comment',
            id: 1,
            name: 'Name',
            password: 'test',
            profession: 'Profession',
            username: 'Username',
        };

        expect(createUser(data)).toEqual(data);
    });
    it('Create user with partial fields', () => {
        const data = { id: 1, name: 'User', password: 'test', username: 'Username' };
        expect(createUser(data)).toEqual({
            ...data,
            age: 0,
            comment: '',
            profession: ''
        });
    });    
})