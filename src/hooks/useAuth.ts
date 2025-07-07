import { computed, shallowRef } from 'vue';
import type { ComputedRef } from 'vue';
import { delay } from '../utils';

type AuthState = {
    logged: ComputedRef<boolean>;
    login(): Promise<void>;
    logout(): Promise<void>;
};

let state: AuthState | null = null;

function createState() {
    const isLogged = shallowRef(false);

    state = {
        logged: computed(() => isLogged.value),
        async login() {
            await delay(150);
            isLogged.value = true;
        },
        async logout() {
            await delay(100);
            isLogged.value = false;
        }
    }
    return state;
}

export function useAuth() {
    return state || createState();
}