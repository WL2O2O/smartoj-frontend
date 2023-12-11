<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GloableHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://wlei224.gitee.io" target="_blank">
          SmartOJ By CSGUIDER
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<style scoped>
#basicLayout {
}

.header {
  box-shadow: #eee 1px 1px 5px;
}

.content {
  background: linear-gradient(to right, #fefefe, #fff);
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
<script>
import GloableHeader from "@/components/GloableHeader";

export default {
  components: { GloableHeader },
};
</script>
