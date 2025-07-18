<script setup lang="ts">
import {
    Button,
    Form,
    FormItem,
    Input,
    InputNumber,
    InputPassword,
    Space,
    Textarea,
    notification,
} from 'ant-design-vue';
import type { FormProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { computed, ref, shallowRef, watch } from 'vue';
import type { Ref } from 'vue';
import { ErrorTexts } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { useUsers } from '../../hooks/useUsers';
import type { AppUserValue, RegisterUserValue } from '../../models/user';

const props = defineProps({ id: String });

const router = useRouter();

const { currentUser } = useAuth();
const { createUser, getUserById, updateUser } = useUsers();

const id = props.id ? +props.id : 0;
const rules: FormProps['rules'] = {
    name: { message: "Name can't be empty", required: true },
    username: { message: "Username can't be empty", required: true },
};
const [apiNotification, ContextHolder] = notification.useNotification();

const model: Ref<AppUserValue | RegisterUserValue> = ref({
    name: '',
    password: '',
    repeatPassword: '',
    username: '',
});

const changed = shallowRef(false);
const loading = shallowRef(false);

const enableBack = computed(() => {
    return currentUser.value?.admin;
})

async function getUser() {
    if (id) {
        model.value = await getUserById(id);
    }

    watch(model, () => changed.value = true, { deep: true, once: true });
}

function goBack() {
    if(enableBack.value) {
        router.back();
    }
}

async function handlerSave() {
    loading.value = true;

    try {
        if ('id' in model.value) {
            await updateUser(model.value);
        } else {
            await createUser(model.value);
        }
        goBack();
    } catch (e: any) {
        apiNotification.error({
            duration: 1,
            message: e.message || ErrorTexts.unknown,
        });
    }

    loading.value = false;
}

if (!id) {
    rules.password = { message: "Password can't be empty", required: true };
    rules.repeatPassword = {
        required: true,
        validator: (_, value: string) => {
            if (!value) {
                return Promise.reject('Repeat must be filled');
            } else if (value !== (model.value as RegisterUserValue).password) {
                return Promise.reject("The password doesn't match");
            } else {
                return Promise.resolve();
            }
        },
    };
}

getUser();
</script>

<template>
    <Form @finish="handlerSave" :model="model" :rules="rules">
        <FormItem label="Name" name="name">
            <Input v-model:value="model.name"></Input>
        </FormItem>
        <FormItem label="Username" name="username" readonly>
            <Input autocomplete="off" v-model:value="model.username"></Input>
        </FormItem>
        <template v-if="!id">
            <FormItem label="Password" name="password" readonly>
                <InputPassword
                    autocomplete="off"
                    v-model:value="(model as RegisterUserValue).password"
                ></InputPassword>
            </FormItem>
            <FormItem label="Repeat pass" name="repeatPassword" readonly>
                <InputPassword
                    autocomplete="off"
                    v-model:value="(model as RegisterUserValue).repeatPassword"
                ></InputPassword>
            </FormItem>
        </template>
        <FormItem label="Age" name="age">
            <InputNumber
                v-model:value="model.age"
                max="199"
                min="0"
            ></InputNumber>
        </FormItem>
        <FormItem label="Profession" name="profession">
            <Input v-model:value="model.profession"></Input>
        </FormItem>
        <FormItem label="Comment" name="comment">
            <Textarea v-model:value="model.comment"></Textarea>
        </FormItem>
        <FormItem>
            <Space>
                <Button :disabled="!changed" html-type="submit" type="primary">Save</Button>
                <Button v-if="enableBack" @click="goBack">Back</Button>
            </Space>
        </FormItem>
        <ContextHolder></ContextHolder>
    </Form>
</template>

<style scoped>
.ant-form {
    padding: 1rem;
}
</style>
