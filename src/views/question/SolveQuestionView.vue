<template>
  <a-row
    id="solveQuestionViewHeader"
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
    <!--  增加一个组合按钮  -->
    <div>
      <a-button
        type="default"
        shape="square"
        @click="toPrevious"
        style="left: -588px; border: 0; margin: 1px"
      >
        <icon-font type="icon-left" :size="20" />
      </a-button>
      <a-button
        type="default"
        shape="square"
        @click="toNext"
        style="left: -588px; border: 0; margin: 1px"
      >
        <icon-font type="icon-right" :size="20" />
      </a-button>
      <a-button
        type="default"
        shape="square"
        @click="toRandom"
        style="left: -588px; border: 0; margin: 1px"
      >
        <icon-font type="icon-random" :size="20" />
      </a-button>
      <a-button
        type="default"
        shape="square"
        :loading="loading"
        @click="doSubmit"
        style="left: -588px; border: 0; margin: 1px"
      >
        <icon-font type="icon-start" :size="20" />
        提交</a-button
      >
    </div>

    <div id="userInfoView" style="margin-right: 30px">
      <a-dropdown trigger="hover">
        <a-avatar shape="square" style="background-color: #3370ff">
          {{ store.state.user?.loginUser?.userName ?? "未登录" }}
        </a-avatar>
        <template #content v-if="!isLoggedIn">
          <a-doption v-if="!isLoggedIn" @click="login">
            <icon-font type="icon-login" :size="14" /> 点击登录
          </a-doption>
          <a-doption v-if="!isLoggedIn" @click="register">
            <icon-font type="icon-login" :size="14" /> 点击注册
          </a-doption>
        </template>
        <template #content v-else>
          <a-doption @click="setting">
            <icon-font type="icon-wode" :size="14" /> 个人信息</a-doption
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
  <div id="solveQuestionView">
    <a-split
      :style="{
        height: '86vh',
        top: '50px',
        bottom: '15px',
        width: '100%',
        minWidth: '500px',
        border: '1px solid var(--color-border)',
        paddingTop: '5px',
        paddingLeft: '5px',
      }"
    >
      <template #first>
        <a-typography-paragraph>
          <!--题目描述框-->
          <a-col :md="36" :xs="48">
            <a-tabs
              default-active-key="question"
              type="card-gutter"
              :editable="false"
              @add="handleAdd"
              @delete="handleDelete"
              show-add-button
              auto-switch
            >
              <a-tab-pane key="question">
                <template #title>
                  <icon-font type="icon-des" /> 题目描述
                </template>
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
                  <a-divider size="5" />
                  <a-descriptions :column="{ xs: 1, md: 2, lg: 3 }">
                    <a-descriptions-item label="通过次数">
                      {{ question.acceptNum ?? 0 }}
                    </a-descriptions-item>
                    <a-descriptions-item label="提交次数">
                      {{ question.submitNum ?? 0 }}
                    </a-descriptions-item>
                    <a-descriptions-item label="通过率">
                      {{
                        (
                          (question.acceptNum / question.submitNum) * 100 || 0
                        ).toFixed(2) + "%" ?? 0
                      }}
                    </a-descriptions-item>
                  </a-descriptions>
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
              <a-tab-pane key="comment">
                <template #title>
                  <icon-font type="icon-history" /> 提交记录
                </template>
                TODO://查看提交记录
              </a-tab-pane>
              <a-tab-pane key="answer">
                <template #title>
                  <icon-font type="icon-answer" /> 查看题解
                </template>
                暂时无法查看答案
              </a-tab-pane>
            </a-tabs>
          </a-col>
        </a-typography-paragraph>
      </template>
      <template #second>
        <div>
          <a-split direction="vertical" :style="{ height: '85vh' }">
            <template #first
              ><a-typography-paragraph>
                <a-col :md="48" :xs="72">
                  <a-form :model="submitForm" layout="inline">
                    <a-form-item>
                      <a-select
                        v-model="submitForm.language"
                        style="background-color: #f7f8fa"
                        placeholder="选择编程语言"
                      >
                        <a-option>java</a-option>
                        <a-option>cpp</a-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                  <CodeEditor
                    :value="submitForm.code"
                    :language="submitForm.language"
                    :handle-change="changeCode"
                  />
                  <a-divider size="0" />
                </a-col>
              </a-typography-paragraph>
            </template>
            <template #second>
              <a-typography-paragraph style="padding: 5px">
                <!--题目描述框-->
                <a-col :md="36" :xs="48">
                  <a-tabs default-active-key="question">
                    <a-tab-pane key="question">
                      <template #title>
                        <icon-font type="icon-test" /> 测试用例
                      </template>
                    </a-tab-pane>
                    <a-tab-pane key="comment">
                      <template #title>
                        <icon-font type="icon-run" /> 执行结果
                      </template>
                      <div
                        style="
                          color: #3c3c4399;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          margin-top: 90px;
                        "
                      >
                        请先执行代码
                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
              </a-typography-paragraph>
            </template>
          </a-split>
        </div>
      </template>
    </a-split>
  </div>
</template>

<script setup lang="ts">
// const currentQuestionId = ref(null);
// const questionIds = ref([]);
//
// const loadingIdsData = async () => {
//   try {
//     // 使用服务获取所有题目的ID
//     const response =
//       await QuestionControllerService.getQuestionIdListUsingGet();
//     const ids = response.data; // 从 response.data 中获取 ID 列表
//     // console.log(666);
//     // console.log(response);
//     questionIds.value = ids;
//     currentQuestionId.value = ids[0]; // 设置初始ID
//   } catch (error) {
//     console.error("Error fetching question IDs:", error);
//   }
// };
import * as path from "path";
const route = useRoute();
// const questionIds = ref<number[]>([]);
let questionIds: number[] | null[] = [];
let questionIndex = 0;
const loadingIdsData = async () => {
  try {
    // 使用服务获取所有题目的ID
    const response =
      await QuestionControllerService.getQuestionIdListUsingGet();
    // 获取当前题目的id，并保存到全局变量中供切换题目方法使用
    const questionId = Number(route.params.id);

    // 从 response.data 中获取 ID 列表
    const ids = response.data;
    console.log("转换前：");
    console.log(ids);

    // 将 ids 数组的元素转换为数字
    const idsAsNumbers = ids.map(Number);

    questionIds = idsAsNumbers;
    console.log("转换后：");
    console.log(idsAsNumbers);

    // 找到当前题目的索引并赋值给 questionIndex
    questionIndex = idsAsNumbers.findIndex((id) => id === questionId);
    // console.log(8888);
    // console.log(ids);
    // console.log("index = " + questionIndex);
    // console.log("length = " + questionIds.length);

    // currentQuestionId.value = ids[3]; // 设置初始ID
    // 找到当前题目的索引并赋值给 questionIndex
    // questionIndex = ids.findIndex((id) => id === questionId);
  } catch (error) {
    console.error("Error fetching question IDs:", error);
  }
};

/**
 * @description 点击跳转上一题
 */
const toPrevious = () => {
  // 获取当前题目id的索引值index
  // 获取索引值为index-1的题目id
  // router.push(ids[index - 1])

  // router
  //   .push({
  //     path: `${currentQuestionId.value}`,
  //   })
  //   .then(() => {
  //     window.history.go(0);
  //   });

  if (questionIndex > 0) {
    questionIndex--;
    // currentQuestionId.value = questionIds[questionIndex];
    router.push(`/view/question/${questionIds[questionIndex]}`).then(() => {
      window.history.go(0);
    });
  } else {
    message.info("已经是第一题了！");
  }
};

const toNext = () => {
  if (questionIndex < questionIds.length - 1) {
    questionIndex++;
    // currentQuestionId.value = questionIds[questionIndex];
    router.push(`/view/question/${questionIds[questionIndex]}`).then(() => {
      window.history.go(0);
    });
  } else {
    message.info("已经是最后一题了！");
  }
};

function getRandomIntInclusive(max: number) {
  return Math.floor(Math.random() * (max + 1));
}
//
// // 获取当前的questionIds长度
const questionIdsLength = computed(() => questionIds.length);
// console.log(9999);
//
// console.log("我在全局方法中，长度为：" + questionIdsLength.value);
// const randomInt = getRandomIntInclusive(11);
// console.log("random: " + randomInt); // 输出0到11之间的随机整数

const toRandom = () => {
  const randomIndex = getRandomIntInclusive(questionIdsLength.value);
  console.log(questionIdsLength.value);
  router.push(`/view/question/${questionIds[randomIndex]}`).then(() => {
    window.history.go(0);
  });
};
// 引入按钮所需的组件
// import { ref } from "vue";
import MdViewer from "@/components/MdViewer.vue";

const loading = ref(false);

import {
  onMounted,
  ref,
  computed,
  withDefaults,
  defineProps,
  watch,
} from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
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
    path: "/user/login",
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
import { useRoute, useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";

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

const loadData = async () => {
  const resouse = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (resouse.code === 0) {
    question.value = resouse.data;
  } else {
    message.error("加载失败，" + resouse.message);
  }
};

const submitForm = ref<QuestionSubmitAddRequest>({
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
    ...submitForm.value,
    questionId: question.value.id,
  });

  if (!submitForm.value.code) {
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

  // 刷新数据，更新左侧题目模块的通过率
  loadData();
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  // loadTestData();
  loadData();
  loadingIdsData();
});

/**
 * 用户输入的 code 填充到表单
 * @param value
 */
const changeCode = (value: string) => {
  submitForm.value.code = value;
};
</script>

<style>
#solveQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#solveQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
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
