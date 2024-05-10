<template>
  <div id="userRegisterView">
    <div class="title">用户注册</div>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
    >
      <a-form-item
        required
        field="userAccount"
        label="账号"
        tooltip="账号不少于 4 位"
        :rules="[
          { required: true, message: '账号不能为空' },
          { minLength: 4, message: '账号长度不能低于4位' },
        ]"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        required
        field="userName"
        label="昵称"
        tooltip="起一个酷酷的昵称吧"
        :rules="[{ required: true, message: '昵称不能为空' }]"
      >
        <a-input v-model="form.userName" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item
        required
        field="userPassword"
        tooltip="密码不能小于8位"
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 4, message: '密码不能小于8位' },
        ]"
        label="密码"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        required
        field="checkPassword"
        tooltip="密码不少于 8 位"
        label="确认密码"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请确认密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="outline"
          html-type="submit"
          shape="round"
          style="width: 120px"
          @click="toIndex"
        >
          首 页
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          style="width: 120px"
          shape="round"
          html-type="submit"
          @click="handleSubmit"
        >
          注 册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style>
#userRegisterView {
}
.title {
  margin-bottom: 16px;
  color: #eeeeee;
  font-size: large;
  font-weight: bold;
}
</style>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Message } from "@arco-design/web-vue";

const router = useRouter();
const store = useStore();

const form = reactive<UserRegisterRequest>({
  checkPassword: "",
  userAccount: "",
  userName: "",
  userPassword: "",
});

const handleSubmit = async () => {
  if (
    form?.checkPassword?.length !== form.userPassword?.length ||
    form.checkPassword !== form.userPassword
  ) {
    Message.error("两次输入密码不一致");
    return;
  }

  // 拿到后端的响应
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 登录成功跳转到主页
  if (res.code === 0) {
    // 获取到用户信息之后再跳转到主页
    await store.dispatch("user/getLoginUser");
    await router.push({
      path: "/user/login",
      replace: true,
    });
    message.success("注册成功！");
  } else {
    message.error("注册失败！" + res.message);
  }
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
</script>
