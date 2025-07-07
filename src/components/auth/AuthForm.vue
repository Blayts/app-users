<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../hooks/useAuth';

const router = useRouter();

const { login } = useAuth();

function goToRegisterForm() {
    router.push('/register');
}
</script>

<template>
    <div>
        <h3>Auth Form</h3>
        <Button @click="login">Login</Button>
        <Button @click="goToRegisterForm">Register</Button>
    </div>    
</template>

<style scoped>
</style>