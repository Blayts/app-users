<script setup lang="ts">
import { Button, Form, FormItem, Input, InputPassword, Space } from 'ant-design-vue';
import type { FormProps } from 'ant-design-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import { useAuth } from '../../hooks/useAuth';

const router = useRouter();

// const { login } = useAuth();

const model = ref({ password: '', username: '' });

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

function handlerFinish(values: any) {
    console.log('AUTHORIZE', values);
    //login(model.login, model.password);
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
                        <Button html-type="submit">Log in</Button>
                        <Button @click="goToRegisterForm" type="link">Register</Button>
                    </Space>
                </FormItem>
            </Form>
        </main>
    </section>
</template>

<style scoped>
</style>