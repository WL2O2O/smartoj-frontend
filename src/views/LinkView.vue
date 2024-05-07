<!--<template>-->
<!--  <div class="about">-->
<!--    <h1>This is an about page</h1>-->
<!--  </div>-->
<!--</template>-->
<template>
  <div>
    <!-- 这里可以放一些提示信息或样式 -->
    跳转中...
  </div>
</template>

<script>
export default {
  beforeMount() {
    window.location.href = "https://github.com";
  },
};
</script>
