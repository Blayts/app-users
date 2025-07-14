<script setup lang="ts">
import { Button, Col, Layout, LayoutHeader, LayoutContent, Row } from 'ant-design-vue';
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';
import { useAuth } from '../../hooks/useAuth';

const { logout } = useAuth();

const route = useRoute();

const title = computed(() => route.path.endsWith('/users') ? 'Users List': 'User Form');
</script>

<template>
    <Layout>
        <LayoutHeader>
            <Row align="middle" justify="space-between">
                <Col>{{ title }}</Col>
                <Col>
                    <Button @click="logout">Logout</Button>    
                </Col>
            </Row>
        </LayoutHeader>
        <LayoutContent>
            <RouterView></RouterView>
        </LayoutContent>
    </Layout>
</template>

<style scoped lang="less">
.ant-layout {
    height: 100vh;
    width: 100vw;
}
.ant-layout-header {
    color: white;
}
</style>