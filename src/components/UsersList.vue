<script setup lang="ts">
import { Table } from 'ant-design-vue';
import type { TableColumnProps, TableProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const columns: TableColumnProps[] = [
    { dataIndex: 'username', title: 'Username' },
    { dataIndex: 'name', title: 'Name' },
    { dataIndex: 'age', title: 'Age' },
    { dataIndex: 'profession', title: 'Profession' },
    { dataIndex: 'comment', title: 'Comment' },
    { key: 'delete' }
];
const fakeData = Array(8).fill(1).map((_, idx: number) => (
    {
        age: 25 + idx * 2,
        comment: 'Some comment... #' + (idx + 1),
        name: 'Some name #' + (idx + 1),
        profession: 'Profession #' + (idx + 1),
        username: 'Username #' + (idx + 1)
    }));
const customRow: TableProps['customRow'] = (data) => ({
    onClick: () => router.push('/users/' + data.id)
});
</script>

<template>            
    <Table 
        :columns="columns" 
        :custom-row="customRow"
        :data-source="fakeData" 
        :pagination="false"
    ></Table>
</template>

<style scoped>
</style>