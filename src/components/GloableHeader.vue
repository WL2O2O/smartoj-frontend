<template>
  <a-row
    id="GloableHeader"
    class="grid-demo"
    style="margin-bottom: 16px"
    align="center"
  >
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        theme="light"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj.png" alt="logo" />
            <div
              class="title"
              :style="{
                width: '80px',
                height: '30px',
                background: 'var(--color-fill-3)',
                cursor: 'text',
                borderRadius: '4px',
              }"
            >
              Smart OJ
            </div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in routes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

// 使用 vueRouter 实现路由跳转
const router = useRouter();

// 定义响应变量为默认主页
const selectedKeys = ref(["/"]);
// 路由跳转后，同步更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const store = useStore();
console.log();

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "CSGUIDER",
    role: "admin",
  });
}, 3000);
</script>

<style scoped>
.title-bar {
  display: flex;
  text-align: center;
  align-items: center;
}

.logo {
  height: 40px;
}

.title {
  margin-left: 8px;
  color: #00a54a;
}
</style>
