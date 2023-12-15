<template>
  <el-card>
    <el-table :data="tableData" height="800px" style="width: 100%" align="center">
      <el-table-column
        prop="headPic"
        label="头像"
        width="250"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="nickName"
        label="昵称"
        width="250"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="userName"
        label="账号"
        width="250"
        header-align="center"
        align="center"
      />
      <el-table-column prop="email" label="邮箱" width="250" header-align="center" align="center" />
      <el-table-column
        prop="email"
        label="手机号"
        width="250"
        header-align="center"
        align="center"
      />
      <el-table-column label="冻结账号" width="250" header-align="center" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.isFrozen" @change="switchChange(row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template #default="{ row }">
          <el-button type="danger" link @click="deleteClick(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-end mt-mt-custom">
      <Pagination :total-count="total" :page-size="params.pageSize" @page-change="pageChange" />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
  import { getUserList, freezeUser, deleteUser } from '@/api/system';

  const tableData = ref([]);

  const params = reactive({
    pageNo: 1,
    pageSize: 10,
    username: '',
    nickName: '',
    email: '',
  });
  //总数量
  const total = ref(0);
  //获取用户列表
  const getUserLists = async () => {
    const res = await getUserList({
      params: {
        pageNo: params.pageNo,
        pageSize: params.pageSize,
        username: params.username,
        nickName: params.nickName,
        email: params.email,
      },
    });
    tableData.value = res.data.users;
    total.value = res.data.totalCount;
  };
  //分页
  const pageChange = (val: { currentPage: number; pageSize: number }) => {
    params.pageNo = val.currentPage;
    params.pageSize = val.pageSize;
    getUserLists();
  };
  //冻结账号
  const switchChange = async (row: { id: any }) => {
    await freezeUser({
      params: {
        id: row.id,
      },
    });
  };

  //删除账号
  const deleteClick = (row: { id: any }) => {
    ElMessageBox.confirm('确定删除此账号吗，删除后将无法恢复', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        await deleteUser({
          params: {
            id: row.id,
          },
        });
        getUserLists();
      })
      .catch(() => {});
  };

  onMounted(async () => {
    getUserLists();
  });
</script>

<style lang="scss" scoped></style>
