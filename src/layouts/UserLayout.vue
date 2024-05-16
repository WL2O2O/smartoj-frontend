<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img
            src="https://cs-wlei224.obs.cn-south-1.myhuaweicloud.com/blog-imgs/202311280107890.ico"
            class="logo"
            alt="logo picture"
          />
          <div style="color: #f2f3f5; font-size: 40px">Smart OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a
          href="https://wl2o2o.github.io"
          target="_blank"
          style="color: #eeeeee"
        >
          SmartOJ By CSGUIDER
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<style scoped>
#userLayout {
  text-align: center;
  background: url("https://cs-wlei224.obs.cn-south-1.myhuaweicloud.com/blog-imgs/202310251653374.jpg")
    0 0 / 100% 100%;
}
.logo {
  height: 64px;
  width: 64px;
}

.header {
  margin-top: 35px;
}

.content {
  padding: 20px;
  margin-bottom: 15px;
}

.footer {
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  padding: 15px;
  text-align: center;
}
</style>
<script></script>
