import { delay } from '../utils';

export function useUsers() {
    return {
        async getUserById(id: number) {            
            console.log('GET USER BY ID', id);
            await delay(100);
            return null
        },
        async getUsers() {
            await delay(300);
            return [];
        }
    }
}