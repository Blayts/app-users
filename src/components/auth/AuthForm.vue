<script setup lang="ts">
import { Button, Form, FormItem, Input, InputPassword, notification, Space, Spin } from 'ant-design-vue';
import type { FormProps } from 'ant-design-vue';
import { ref, shallowRef } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { ErrorTexts } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import type { UserValue } from '../../models/user';

type AuthUserValue = Pick<UserValue, 'password' | 'username'>;

const router = useRouter();

const { currentUser, login, prolong } = useAuth();
const [apiNotification, ContextHolder] = notification.useNotification();

const model: Ref<AuthUserValue> = ref({ password: '', username: '' });

const init = shallowRef(false);
const loading = shallowRef(false);

const rules: FormProps['rules'] = {
    password: {
        message: 'Password can\'t be empty',
        validator(_, value: string) {
            return value ? Promise.resolve(): Promise.reject();
        },
    },
    username: {
        message: 'Username can\'t be empty',
        validator(_, value: string) {
            return value ? Promise.resolve(): Promise.reject();
        }
    },
};

function goToRegisterForm() {
    router.push('/register');
}

function nextRoute() {
    if(currentUser.value) {
        const path = '/users' + (currentUser.value.admin ? '': '/' + currentUser.value.id);
        router.push(path);
    }
}

async function handlerFinish(values: AuthUserValue) {
    loading.value = true;

    try {
        await login(values.username, values.password);
        nextRoute();
    }
    catch(e: any) {
        apiNotification.error({
            duration: 1,
            message: e.message || ErrorTexts.unknown
        });
    }
    finally {
        loading.value = false;
    }
}

async function prolongSession() {    
    try {
        await prolong();
        nextRoute();
    }
    finally {
        init.value = true;
    }
}

prolongSession();
</script>

<template>
    <Spin v-if="!init" spinning></Spin>
    <section v-else>
        <header>
            <h3 style="text-align: center;">Authorize</h3>
        </header>
        <main>
            <Form @finish="handlerFinish" :model="model" :rules="rules">
                <FormItem label="Username" name="username" :label-col="{ span: 8 }">
                    <Input 
                        autocomplete="off" 
                        v-model:value="model.username"
                    ></Input>
                </FormItem>
                <FormItem label="Password" name="password" :label-col="{ span: 8 }">
                    <InputPassword
                        autocomplete="off" 
                        v-model:value="model.password" 
                    ></InputPassword>
                </FormItem>
                <FormItem :wrapper-col="{ offset: 8 }">
                    <Space>
                        <Button :disabled="loading" html-type="submit" type="primary">Log in</Button>
                        <Button @click="goToRegisterForm" :disabled="loading" type="link">Register</Button>
                    </Space>
                </FormItem>
            </Form>
        </main>
        <ContextHolder></ContextHolder>
    </section>
</template>

<style scoped>
</style>