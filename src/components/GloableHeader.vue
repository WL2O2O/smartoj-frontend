<template>
  <a-row id="GloableHeader" class="grid-demo" align="center" :wrap="false">
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
                height: '40px',
                background: 'var(--color-fill-3)',
                cursor: 'text',
                borderRadius: '4px',
              }"
            >
              Smart OJ
            </div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

// 使用 vueRouter 实现路由跳转
const router = useRouter();
const store = useStore();
// 路由过滤
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 加上用户权限的逻辑
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

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

// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "CSGUIDER",
//     userRole: ACCESS_ENUM.ADMIN,
//   });
// }, 3000);
</script>

<style scoped>
#GloableHeader {
  color: #000000;
}

.title-bar {
  display: flex;
  text-align: center;
  align-items: center;
}

.logo {
  height: 40px;
}

.title {
  line-height: 40px;
  color: #00a54a;
  margin: auto 8px;
}
</style>
