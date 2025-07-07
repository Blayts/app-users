<script setup lang="ts">
import { Button } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
    router.back();
}
</script>

<template>
    <div>
        <h3>Register Form</h3>
        <Button @click="goBack">Back</Button>
    </div>
</template>

<style scoped>
</style>