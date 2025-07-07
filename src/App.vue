<script setup lang="ts">
import { watch } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { useAuth } from './hooks/useAuth';

const router = useRouter();

const { logged } = useAuth();

watch(logged, (value: boolean) => {
    if(value) {
        router.push('/users');
    }
    else {
        router.push('/auth');
    }
},
{
    immediate: true
})
</script>

<template>
    <RouterView></RouterView>
</template>

<style scoped>
</style>
