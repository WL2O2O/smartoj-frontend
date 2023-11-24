<template>
  <div class="admin">
    oh! 管理员大人来了，欢迎您！！！
    <img alt="Vue logo" style="height: 20px" src="../assets/oj.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "AdminView",
  components: {
    HelloWorld,
  },
});
</script>
