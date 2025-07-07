import { createMemoryHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import AuthForm from './components/auth/AuthForm.vue';
import NotFound from './components/NotFound.vue';
import RegisterForm from './components/auth/RegisterForm.vue';
import UserForm from './components/UserForm.vue';
import UsersList from './components/UsersList.vue';

const routes: RouteRecordRaw[] = [
    { path: '/auth', component: AuthForm },
    { path: '/register', component: RegisterForm },
    { 
        path: '/users', 
        children: [
            { path: '', component: UsersList },
            { path: ':id', component: UserForm, props: true },
        ],
    },
    { path: '/:pathMatch(.*)*', component: NotFound }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
