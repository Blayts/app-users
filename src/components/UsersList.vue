<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../hooks/useAuth';

const router = useRouter();

const { logout } = useAuth();

function toUserForm() {
    router.push('/users/1');
}
</script>

<template>
    <div>
        <h3>Users List</h3>
        <Button @click="toUserForm">User 1</Button>
        <Button @click="logout">Logout</Button>
    </div>    
</template>

<style scoped>
</style>