<template>
  <a-row
    id="GloableHeader"
    class="grid-demo"
    align="center"
    :wrap="false"
    style="
      background-color: white !important; /* 不透明的白色背景 */
      box-shadow: inset 0px -10px 15px -15px rgba(35, 7, 7, 0.21);
      border-radius: 10px;
    "
  >
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        theme="light"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
        style="box-shadow: inset 0px -10px 15px -15px rgba(35, 7, 7, 0.21)"
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
        <a-menu-item key="/">
          <icon-font type="icon-coding" :size="14" />
          <a style="margin-left: 0">题库</a>
        </a-menu-item>
        <a-menu-item key="/questions_submit">
          <icon-font type="icon-sjkb" :size="14" />
          <a style="margin-left: 0">数据看板</a>
        </a-menu-item>
        <a-menu-item
          key="/manage/question"
          v-if="checkAccess(store.state.user?.loginUser, ACCESS_ENUM.ADMIN)"
        >
          <icon-font type="icon-stgl" :size="14" />
          <a style="margin-left: 0">题目管理</a>
        </a-menu-item>
        <a-menu-item
          key="/manage/user"
          v-if="checkAccess(store.state.user?.loginUser, ACCESS_ENUM.ADMIN)"
        >
          <icon-font type="icon-jsgl" :size="14" />
          <a style="margin-left: 0">用户管理</a>
        </a-menu-item>
        <a-menu-item key="/test">
          <icon-font type="icon-sjkb" :size="14" />
          <a style="margin-left: 0">测试</a>
        </a-menu-item>
      </a-menu>
    </a-col>
    <div id="userInfoView" style="margin-right: 30px">
      <a-dropdown trigger="hover">
        <a-avatar shape="square" style="background-color: #3370ff">
          {{ store.state.user?.loginUser?.userName ?? "未登录" }}
        </a-avatar>
        <template #content v-if="!isLoggedIn">
          <a-doption v-if="!isLoggedIn" @click="login">登 录</a-doption>
        </template>
        <template #content v-else>
          <a-doption @click="setting"
            ><icon-font type="icon-wode" :size="14" /> 个人信息</a-doption
          >
          <a-doption @click="logout"
            ><icon-font type="icon-tuichu" :size="15" /> 退出系统</a-doption
          >
          <a-doption @click="link"
            ><icon-font type="icon-rongqifuwu" :size="15" /> 沙箱支持</a-doption
          >
        </template>
      </a-dropdown>
    </div>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import { UserControllerService } from "../../generated";
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

// 计算属性，判断用户是否已登录
const isLoggedIn = computed(() => {
  if (store.state.user?.loginUser?.userName) return true;
  else return false;
});

// 用户登录
const login = () => {
  router.push({
    path: "user/login",
  });
};

// 用户注销
const logout = () => {
  UserControllerService.userLogoutUsingPost();
  router.push({
    path: "/",
  });
  location.reload();
};

// 跳转沙箱链接
// 用户登录
const link = () => {
  router.push({
    path: "/link",
  });
};

// 个人信息
const setting = () => {
  router.push({
    path: "/info",
  });
};
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "CSGUIDER",
//     userRole: ACCESS_ENUM.ADMIN,
//   });
// }, 3000);
import { Icon } from "@arco-design/web-vue";

const IconFont = Icon.addFromIconFontCn({
  src: "https://at.alicdn.com/t/c/font_4402305_p3sdkfe4k8.js",
});
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
