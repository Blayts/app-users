<script setup lang="ts">
import { Button, Form, FormItem, Input, InputPassword, notification, Space } from 'ant-design-vue';
import type { FormProps } from 'ant-design-vue';
import { ref, shallowRef } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../hooks/useAuth';
import type { UserValue } from '../../types';
import { ErrorTexts } from '../../constants';

type AuthUserValue = Pick<UserValue, 'password' | 'username'>;

const router = useRouter();

const { login } = useAuth();
const [apiNotification, ContextHolder] = notification.useNotification();

const model: Ref<AuthUserValue> = ref({ password: '', username: '' });

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

async function handlerFinish(values: AuthUserValue) {
    loading.value = true;

    try {
        await login(values.username, values.password);
        router.push('/users');
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
</script>

<template>
    <section>
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