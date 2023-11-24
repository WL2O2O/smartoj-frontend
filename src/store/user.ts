// initial state
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      username: "未登录",
      role: "notLogin",
    },
  }),

  // actions--修改变量
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // TODO 实际业务要改为从远程获取登录用户
      commit("updateUser", { userName: "CSGUIDER" });
    },
  },

  // mutations--定义对变量更新的方法
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
