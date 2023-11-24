<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { onMounted } from "vue";

const router = useRouter();
const store = useStore();

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = () => {
  console.log("hello 欢迎来到我的项目");
};

onMounted(() => {
  doInit();
});

// const loginUser = store.state.user.loginUser?.userRole;
// router.beforeEach((to, from, next) => {
//   // 仅管理员可见，判断当前用户是否有权限
//   if (to.meta?.access === "admin") {
//     alert(loginUser);
//     if (loginUser === ACCESS_ENUM.ADMIN) {
//       next("/admin");
//       return;
//     } else {
//       next("/noAuth");
//     }
//   }
//   // 用于正常进行路由导航（比如：当权限检查通过时）
//   next();
// });
</script>
