<template>
  <a-layout-content class="content">
    <div class="not-found">
      <div class="not-found-content">
        <h1>404</h1>
        <p>您没有权限访问该页面</p>
        <p>为您献上一颗安全坤蛋</p>
      </div>
      <div class="not-found-logo">
        <img alt="OJ logo" src="../assets/oj.png" />
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
