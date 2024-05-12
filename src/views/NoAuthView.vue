<template>
  <a-layout-content class="content">
    <div class="not-found">
      <div class="not-found-content">
        <h1>403</h1>
        <p>您还没有权限访问该页面，3s后将自动跳转至首页。</p>
        <p>为你献上作者的座右铭：</p>
        <p>If not now, when? If not me, who?</p>
      </div>
      <div class="not-found-logo">
        <img
          alt="OJ logo"
          src="https://cs-wlei224.obs.cn-south-1.myhuaweicloud.com/blog-imgs/202405081135317.png"
        />
      </div>
    </div>
  </a-layout-content>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    onMounted(() => {
      setTimeout(() => {
        router.push("/");
      }, 3000);
    });

    return {};
  },
};
</script>

<style scoped>
.content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 15px;
  padding: 20px;
  height: 50vh;
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  font-family: Arial, sans-serif;
}

.not-found-content {
  text-align: center;
}

.not-found-content h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
}

.not-found-content p {
  font-size: 18px;
  margin-bottom: 20px;
}

.not-found-logo {
  margin-left: 40px;
}

.not-found-logo img {
  height: 80px;
}
</style>
