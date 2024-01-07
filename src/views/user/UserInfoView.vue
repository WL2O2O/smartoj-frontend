<template>
  <div id="userInfoView">
    <a-card title="我的信息">
      <a-descriptions :data="data" size="large" column="1" bordered />
      <template #extra>
        <a-badge status="success" text="在线" />
      </template>
    </a-card>
    <a-modal
      width="30%"
      :visible="visible"
      placement="right"
      @ok="handleOk"
      @cancel="closeModel"
      unmountOnClose
    >
      <a-form
        :model="loginUser"
        label-align="right"
        title="个人信息"
        style="max-width: 480px; margin: 0 auto"
      >
        <a-form-item field="userAccount" label="昵称：">
          <a-input v-model="updateForm.userName" placeholder="请输入用户名称" />
        </a-form-item>
        <a-form-item field="userProfile" label="简介：">
          <a-textarea
            v-model="updateForm.userProfile"
            placeholder="请输入简介"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <div>
      <a-button
        shape="round"
        status="success"
        size="small"
        type="outline"
        style="margin: 10px"
      >
        <a-link @click="toIndex">首页</a-link>
      </a-button>
      <a-button
        shape="round"
        status="normal"
        size="medium"
        type="outline"
        style="margin: 10px"
        @click="openModalForm"
        >修改用户信息
      </a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
import { UserControllerService, UserUpdateMyRequest } from "../../../generated";
import { ref } from "vue";
import { FileItem, Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();
const file = ref();
/**
 * 获取用户信息
 */
const store = useStore();
let loginUser = store.state.user.loginUser;

const data = [
  {
    label: "用户名称：",
    value: loginUser.userName,
  },
  {
    label: "我的简介：",
    value: loginUser.userProfile,
  },
  {
    label: "用户角色：",
    value: loginUser.userRole,
  },
  {
    label: "创建时间：",
    value: moment(loginUser.createTime).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    label: "修改时间：",
    value: moment(loginUser.updateTime).format("YYYY-MM-DD HH:mm:ss"),
  },
];

const visible = ref(false);
const updateForm = ref<UserUpdateMyRequest>({
  ...store.state.user?.loginUser,
});

// 从表单中获取的用户头像
let userAvatarImg = updateForm.value.userAvatar;

/**
 * 打开弹窗
 */
const openModalForm = () => {
  visible.value = true;
};
/**
 * 确定修改按钮
 */
const handleOk = async () => {
  const res = await UserControllerService.updateMyUserUsingPost({
    ...updateForm.value,
    userAvatar: userAvatarImg,
  });
  if (res.code === 0) {
    Message.success("更新成功！");
    visible.value = false;
    location.reload();
  } else {
    Message.error("更新失败！", res.msg);
  }
};
const closeModel = () => {
  visible.value = false;
};
/**
 * 回到首页
 * @param question
 */
const toIndex = () => {
  router.push({
    path: `/`,
  });
};
const onChange = async (_: never, currentFile: FileItem) => {
  file.value = {
    ...currentFile,
  };
};
</script>

<style scoped>
#userInfoView {
  margin: 0 auto;
  padding: 10px;
  max-width: 820px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
}
</style>
