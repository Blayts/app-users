<script setup lang="ts">
import { Button, Form, FormItem, Input, InputPassword, Space, notification } from 'ant-design-vue';
import type { FormProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { ref, shallowRef } from 'vue';
import type { Ref } from 'vue';
import { ErrorTexts } from '../../constants';
import { useUsers } from '../../hooks/useUsers';
import type { RegisterUserValue } from '../../models/user';

const router = useRouter();

const { createUser } = useUsers();

const [apiNotification, ContextHolder] = notification.useNotification();

const model: Ref<RegisterUserValue> = ref({
    name: '', 
    password: '', 
    repeatPassword: '', 
    username: '' 
});

const loading = shallowRef(false);

const labelCol: FormProps['labelCol'] = { span: 8 };
const rules: FormProps['rules'] = {
    name: {
        message: 'Name must be filled',
        required: true
    },
    password: {
        message: 'Password must be filled',
        required: true
    },
    repeatPassword: {
        required: true,
        validator: (_, value: string) => {
            if(!value) {
                return Promise.reject('Repeat must be filled');
            }
            else if(value !== model.value.password) {
                return Promise.reject('The password doesn\'t match');
            }
            else {
                return Promise.resolve();
            }
        }
    },
    username: {
        message: 'Username must be filled',
        required: true
    }
};

function goBack() {
    router.back();
}

async function handlerFinish(values: RegisterUserValue) {
    try {
        await createUser(values);
        apiNotification.info({
            duration: 1,
            onClose: () => router.push('/auth'),
            message: 'User successfully created!'
        });
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
            <h3 style="text-align: center;">Register new user</h3>
        </header>
        <main>
            <Form @finish="handlerFinish" :model="model" :rules="rules">
                <FormItem label="Username" name="username" :label-col="labelCol">
                    <Input 
                        autocomplete="off" 
                        v-model:value="model.username"
                    ></Input>
                </FormItem>
                <FormItem label="Name" name="name" :label-col="labelCol">
                    <Input 
                        autocomplete="off" 
                        v-model:value="model.name"
                    ></Input>
                </FormItem>
                <FormItem label="Password" name="password" :label-col="labelCol">
                    <InputPassword
                        autocomplete="off" 
                        v-model:value="model.password" 
                    ></InputPassword>
                </FormItem>
                <FormItem label="Repeat pass" name="repeatPassword" :label-col="labelCol">
                    <InputPassword
                        autocomplete="off" 
                        v-model:value="model.repeatPassword" 
                    ></InputPassword>
                </FormItem>        
                <FormItem :wrapper-col="{ offset: 8 }">
                    <Space>
                        <Button :disabled="loading" html-type="submit" type="primary">Register</Button>
                        <Button @click="goBack" :disabled="loading">Back</Button>
                    </Space>
                </FormItem>
            </Form>
        </main>
        <ContextHolder></ContextHolder>
    </section>
</template>

<style scoped>
</style>