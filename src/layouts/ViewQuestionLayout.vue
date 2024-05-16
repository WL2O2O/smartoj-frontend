<template>
  <div id="viewQuestionLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://wl2o2o.github.io" target="_blank">
          SmartOJ By CSGUIDER
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<style scoped>
#viewQuestionLayout {
}

.content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-top: 48px;
  margin-bottom: 15px;
  padding: 20px;
}

.footer {
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  padding: 15px;
  text-align: center;
  background: #efefef;
}
</style>
<script setup lang="ts"></script>
