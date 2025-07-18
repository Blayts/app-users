<script setup lang="ts">
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { Button, Popconfirm, Table, TableSummary, TableSummaryRow, TableSummaryCell } from 'ant-design-vue';
import type { TableColumnProps, TableProps } from 'ant-design-vue';
import { shallowRef } from 'vue';
import type { ShallowRef } from 'vue';
import { useRouter } from 'vue-router';
import type { AppUserValue } from '../../models/user';
import { useUsers } from '../../hooks/useUsers';

const router = useRouter();

const { getUsers, removeUser } = useUsers();

const columns: TableColumnProps[] = [
    { dataIndex: 'username', title: 'Username' },
    { dataIndex: 'name', title: 'Name' },
    { dataIndex: 'age', title: 'Age' },
    { dataIndex: 'profession', title: 'Profession' },
    { dataIndex: 'comment', title: 'Comment' },
    { key: 'delete', fixed: 'right', width: 60 }
];
const customRow: TableProps['customRow'] = (data) => ({
    onClick: () => router.push('/users/' + data.id),
    style: { cursor: 'pointer' }
});

const loading = shallowRef(false);
const users: ShallowRef<AppUserValue[]> = shallowRef([]);

async function loadUsers() {
    loading.value = true;
    const list = await getUsers();
    users.value = [...list];
    loading.value = false;
}

function addUser() {
    router.push('/users/0');
}

async function remove(id: number) {
    loading.value = true;
    await removeUser(id);
    await loadUsers();
    loading.value = false;
}

loadUsers();
</script>

<template>            
    <Table 
        :columns="columns" 
        :custom-row="customRow"
        :data-source="users" 
        :loading="loading"
        :pagination="false"        
    >
        <template #bodyCell="{ column, record }">
            <Popconfirm 
                v-if="column.key === 'delete' && !record.admin"
                @confirm="remove(record.id)"
                placement="left"
                title="Are you sure you want to delete it？"
            >
                <Button @click.stop="" danger type="link">
                    <template #icon>
                        <DeleteOutlined></DeleteOutlined>
                    </template>
                </Button>
            </Popconfirm>            
        </template>
        <template #summary>
            <TableSummary v-if="users.length < 10">
                <TableSummaryRow>
                    <TableSummaryCell>
                        <Button @click="addUser" type="primary">
                            Add user
                            <template #icon>
                                <PlusOutlined></PlusOutlined>
                            </template>
                        </Button>
                    </TableSummaryCell>                    
                </TableSummaryRow>
            </TableSummary>
        </template>
    </Table>
</template>

<style scoped>
</style>