// initial state
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      username: "未登录",
      userRole: "notLogin",
    },
  }),
  // actions--修改变量
  actions: {
    getLoginUser({ commit, state }, payload) {
      // TODO 实际业务要改为从远程获取登录用户
      commit("updateUser", payload);
    },
  },
  // mutations--定义对变量更新的方法
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
