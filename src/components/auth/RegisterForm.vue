<script setup lang="ts">
import { Button, Form, FormItem, Input, InputPassword, Space } from 'ant-design-vue';
import type { FormProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const model = ref({ name: '', password: '', repeatPassword: '', username: '' });

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

function handlerFinish(values: any) {
    console.log('REGISTER', values);
}

</script>

<template>
    <section>
        <header>
            <h3 style="text-align: center;">Register new user</h3>
        </header>
        <main>
            <Form @finish="handlerFinish" :model="model" :rules="rules">
                <FormItem label="Username" name="username" :label-col="{ span: 8 }">
                    <Input 
                        autocomplete="off" 
                        v-model:value="model.username"
                    ></Input>
                </FormItem>
                <FormItem label="Name" name="name" :label-col="{ span: 8 }">
                    <Input 
                        autocomplete="off" 
                        v-model:value="model.name"
                    ></Input>
                </FormItem>
                <FormItem label="Password" name="password" :label-col="{ span: 8 }">
                    <InputPassword
                        autocomplete="off" 
                        v-model:value="model.password" 
                    ></InputPassword>
                </FormItem>
                <FormItem label="Repeat pass" name="repeatPassword" :label-col="{ span: 8 }">
                    <InputPassword
                        autocomplete="off" 
                        v-model:value="model.repeatPassword" 
                    ></InputPassword>
                </FormItem>        
                <FormItem :wrapper-col="{ offset: 8 }">
                    <Space>
                        <Button html-type="submit" type="primary">Register</Button>
                        <Button @click="goBack">Back</Button>
                    </Space>
                </FormItem>
            </Form>
        </main>
    </section>
</template>

<style scoped>
</style>