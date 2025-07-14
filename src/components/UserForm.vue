<script setup lang="ts">
import { Button, Form, FormItem, Input, InputNumber, Space, Textarea } from 'ant-design-vue';
import type { FormProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const model = ref({ 
    age: 25,
    comment: 'Some comment',
    name: 'Some name',
    profession: 'Some profession',
    username: 'Test' 
});

const rules: FormProps['rules'] = {
    name: { message: 'Name can\'t be empty', required: true },
    username: { message: 'Username can\'t be empty', required: true },
};

function goBack() {
    router.back();
}

function handlerSave() {

}
</script>

<template>
    <Form :model="model" :rules="rules">
        <FormItem label="Name" name="name">
            <Input v-model:value="model.name"></Input>
        </FormItem>
        <FormItem label="Username" name="username" readonly>
            <Input :value="model.username"></Input>
        </FormItem>
        <FormItem label="Age" name="age">
            <InputNumber v-model:value="model.age" max="199" min="0"></InputNumber>
        </FormItem>
        <FormItem label="Profession" name="profession">
            <Input v-model:value="model.profession"></Input>
        </FormItem>
        <FormItem label="Comment" name="comment">
            <Textarea v-model:value="model.comment"></Textarea>
        </FormItem>
        <FormItem>
            <Space>
                <Button @click="handlerSave" type="primary">Save</Button>
                <Button @click="goBack">Back</Button>
            </Space>
        </FormItem>
    </Form>
</template>

<style scoped>
.ant-form {
    padding: 1rem;
}
</style>