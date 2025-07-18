import { computed, shallowRef } from 'vue';
import type { ComputedRef, ShallowRef } from 'vue';
import { useCookie } from './useCookie';
import { useUsers } from './useUsers';
import type { AppUserValue } from '../models/user';
import { delay } from '../utils';
import { ErrorTexts } from '../constants';

type AuthState = {
    currentUser: ComputedRef<AppUserValue | undefined>;
    logged: ComputedRef<boolean>;
    login(username: string, password: string): Promise<void>;
    logout(): Promise<void>;
    prolong(): Promise<void>;
};

let state: AuthState | null = null;

function createState() {
    const isLogged = shallowRef(false);
    const { clearToken, getToken, setToken } = useCookie();
    const { findUser, validate } = useUsers();
    const user: ShallowRef<AppUserValue | undefined> = shallowRef();

    state = {
        currentUser: computed(() => user.value),
        logged: computed(() => isLogged.value),
        async login(username: string, password: string) {
            user.value = await validate(username, password);

            if(user.value) {
                setToken(user.value.username);
            }
            
            isLogged.value = true;
        },
        async logout() {
            await delay(100);
            user.value = undefined;
            isLogged.value = false;
            clearToken();
        },
        async prolong() {
            const username = getToken();

            if(!username) {
                throw new Error(ErrorTexts.noActiveUser);
            }

            user.value = await findUser(username);
            isLogged.value = true;
        }
    }
    return state;
}

export function useAuth() {
    return state || createState();
}