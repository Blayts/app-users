import { computed, ref } from 'vue';
import type { ComputedRef } from 'vue';
import { useStorage } from './useStorage';
import { ErrorTexts } from '../constants';
import { createAppUser } from '../models/user';
import type { AppUserValue, RegisterUserValue } from '../models/user';
import { delay } from '../utils';

type UserState = {
    add(value: Record<string, number | string>): AppUserValue;
    remove(id: number): number;
    update(value: AppUserValue): AppUserValue;
    validate(username: string, password: string): AppUserValue | undefined;
    values: Array<AppUserValue>;
};

let stateUsers: UserState | null = null;

function createState() {
    if(stateUsers) {
        return stateUsers;
    }

    const { read, write } = useStorage('users');
    const state = { hash: {} as Record<string, string>, id: 1, values: [] as AppUserValue[] };
    const result = read<{ id: number, values: any[] }>();

    if(result) {
        state.hash = result.values.reduce((acc, c) => ({ ...acc, [c.username]: c.password }), {});
        state.id = result.id;
        state.values = result.values.map(createAppUser);
    }

    function writeState() {
        if(!stateUsers) {
            return;
        }

        write({ id: state.id, values: state.values.map((v) => ({ ...v, password: state.hash[v.username] }))});
    }

    stateUsers = {
        add(value: Record<string, number | string>) {
            const username = value.username;

            if(typeof(username) !== 'string' || state.hash[username]) {
                throw new Error(ErrorTexts.userExist);
            }

            const user = createAppUser({ ...value, id: state.id++ });

            user.admin = !state.values.length;
            state.hash[user.username] = value.password.toString();
            state.values.push(user);
            writeState();
            return user;
        },
        remove(id: number): number {
            const index = state.values.findIndex((v) => v.id === id);

            if(index === -1) {
                throw new Error(ErrorTexts.userNotFound);
            }

            const user = state.values[index];

            delete state.hash[user.username];
            state.values.splice(index, 1);

            if(user.admin && state.values.length) {
                state.values[index].admin = true;
            }

            writeState();
            return user.id;
        },
        update(value: AppUserValue) {
            if(!state.hash[value.username]) {
                throw new Error(ErrorTexts.userNotExist);
            }
            const index = state.values.findIndex((v) => v.id === value.id);

            if(index === -1) {
                throw new Error(ErrorTexts.userNotFound)
            }
            state.values[index] = value;
            writeState();
            return value;
        },
        validate(username: string, password: string) {
            if(!username || !state.hash?.[username] || state.hash[username] !== password) {
                throw new Error(ErrorTexts.invalidCreds);
            }
            return state.values.find((v) => v.username === username);
        },
        values: state.values
    };

    return stateUsers;
}

export function useUsers() {
    const state = ref(stateUsers || createState());
    const users = computed(() => state.value.values);
    const usersById: ComputedRef<Record<number, AppUserValue>> = computed(() => users.value.reduce((acc, c) => ({ 
        ...acc, [c.id]: c 
    }), {}));

    return {
        async createUser(value: RegisterUserValue) {
            await delay(100);
            return state.value.add(value);
        },
        async getUserById(id: number) {
            await delay(100);
            const user = usersById.value[id];

            if(!user) {
                throw new Error(ErrorTexts.userNotFound);
            }
            return user;
        },
        async getUsers() {
            await delay(300);            
            return users.value;
        },
        async removeUser(id: number) {
            await delay(100);
            return state.value.remove(id);
        },
        async updateUser(value: AppUserValue) {
            await delay(100);
            return state.value.update(value);
        },
        async validate(username: string, password: string) {
            await delay(50);
            return state.value?.validate(username, password);
        }
    };
}