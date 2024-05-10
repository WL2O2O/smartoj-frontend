<template>
  <a-row
    id="header"
    class="grid-demo"
    align="center"
    :wrap="false"
    style="
      background-color: white !important; /* 不透明的白色背景 */
      box-shadow: inset 0px -10px 15px -15px rgba(35, 7, 7, 0.21);
      border-radius: 10px;
      position: fixed; /* 使元素固定定位 */
      top: 0; /* 固定在顶部 */
      width: 100%; /* 可选，根据需要设定宽度，确保菜单栏横跨整个视口 */
      z-index: 100; /* 确保菜单栏在内容之上 */
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
            <img
              class="logo"
              src="https://cs-wlei224.obs.cn-south-1.myhuaweicloud.com/blog-imgs/202405081135317.png"
              alt="logo"
            />
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
      </a-menu>
    </a-col>
    <!--  增加一个按钮  -->
    <a-button
      type="default"
      shape="round"
      :loading="loading"
      @click="doSubmit"
      style="left: -588px; border: 0px"
      >to Submit</a-button
    >
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
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目描述">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="我的提交"
            >TODO://查看提交记录</a-tab-pane
          >
          <a-tab-pane key="answer" title="查看题解">
            暂时无法查看答案</a-tab-pane
          >
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <!--        <a-button type="primary" style="min-width: 200px" @click="doSubmit">-->
        <!--          提交代码-->
        <!--        </a-button>-->
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
// 引入按钮所需的组件
// import { ref } from "vue";

const loading = ref(false);

const handleClick1 = () => {
  loading.value = !loading.value;
};

import {
  onMounted,
  ref,
  computed,
  watchEffect,
  withDefaults,
  defineProps,
} from "vue";
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitVO,
  QuestionVO,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
const router = useRouter();
const store = useStore();
import { useStore } from "vuex";

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
import { useRouter } from "vue-router";

const IconFont = Icon.addFromIconFontCn({
  src: "https://at.alicdn.com/t/c/font_4402305_mkpdx3zmjcr.js",
});
interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();
const questionSubmit = ref<QuestionSubmitVO>();

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  loading.value = true; // 开始加载

  if (!question.value?.id) {
    loading.value = false; // 如果没有id，直接关闭加载
    return;
  }

  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });

  if (!form.value.code) {
    message.error("请先输入代码");
    loading.value = false;
    return;
  }

  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }

  // 保证loading状态至少持续2秒
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.value.code = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

#header {
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
