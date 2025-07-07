<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
    router.push('/users');
}
</script>

<template>
    <div>
        <h3>Not found page</h3>
        <Button @click="goHome">Back to home</Button>
    </div>
    
</template>

<style scoped>
</style>
