<template>
  <div id="userLoginView">
    <div class="title">用户登录</div>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item
        field="userAccount"
        label="账号"
        tooltip="账号长度不能低于4位"
        :rules="[
          { required: true, message: '账号不能为空' },
          { minLength: 4, message: '账号长度不能低于4位' },
        ]"
      >
        <a-input
          v-model="form.userAccount"
          placeholder="测试账号：test 密码：00000000"
        />
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="密码"
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 4, message: '密码不能小于8位' },
        ]"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="width: 120px"
          shape="round"
        >
          登 录
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="outline"
          @click="toRegister"
          style="width: 120px"
          shape="round"
        >
          注 册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style>
#userLoginView {
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
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登陆失败，" + res.message);
  }
};
/**
 * 用户注册
 */
const toRegister = () => {
  router.push({
    path: `/user/register`,
  });
};
</script>
