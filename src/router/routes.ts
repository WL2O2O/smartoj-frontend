import { RouteRecordRaw } from "vue-router";
import NoAuthView from "@/views/NoAuthView.vue";
import LinkView from "@/views/LinkView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import SolveQuestionView from "@/views/question/SolveQuestionView.vue";
import ViewQuestionLayout from "@/layouts/ViewQuestionLayout.vue";
import UserManageView from "@/views/user/UserManageView.vue";
import UserInfoView from "@/views/user/UserInfoView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: "true",
    },
  },
  {
    path: "/",
    name: "题库",
    component: QuestionsView,
  },
  // {
  //   path: "/questions",
  //   name: "浏览题目",
  //   component: QuestionsView,
  // },
  {
    path: "/questions_submit",
    name: "提交总览",
    component: QuestionSubmitView,
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/manage/user",
    name: "用户管理",
    component: UserManageView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/info",
    name: "用户信息",
    component: UserInfoView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/view/question",
    name: "在线做题",
    component: ViewQuestionLayout,
    children: [
      {
        path: "/view/question/:id",
        name: "在线做题",
        // component: ViewQuestionView,
        component: SolveQuestionView,
        props: true,
      },
    ],
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/link",
    name: "SJudge",
    component: LinkView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },

  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: "true",
    },
  },
  {
    path: "/:pathMatch(.*)",
    name: "404",
    component: NotFoundView, // 自定义的 404 页面组件
    meta: {
      hideInMenu: true, // 可根据需要隐藏该路由项
    },
  },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: NoAuthView,
  //   meta: {
  //     hideInMenu: "true",
  //   },
  // },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },

  // {
  //   path: "/about",
  //   name: "关于我的",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/LinkView.vue"),
  // },
];
