import { computed, shallowRef } from 'vue';
import type { ComputedRef, ShallowRef } from 'vue';
import { useUsers } from './useUsers';
import type { AppUserValue } from '../models/user';
import { delay } from '../utils';

type AuthState = {
    currentUser: ComputedRef<AppUserValue | undefined>;
    logged: ComputedRef<boolean>;
    login(username: string, password: string): Promise<void>;
    logout(): Promise<void>;
};

let state: AuthState | null = null;

function createState() {
    const isLogged = shallowRef(false);
    const { validate } = useUsers();
    const user: ShallowRef<AppUserValue | undefined> = shallowRef();

    state = {
        currentUser: computed(() => user.value),
        logged: computed(() => isLogged.value),
        async login(username: string, password: string) {
            user.value = await validate(username, password);
            isLogged.value = true;
        },
        async logout() {
            await delay(100);
            user.value = undefined;
            isLogged.value = false;
        }
    }
    return state;
}

export function useAuth() {
    return state || createState();
}