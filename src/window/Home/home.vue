<template>
  <div class="home">
    <router-link to="/">Home</router-link> |
    <router-link to="/demo">Demo by Decorators</router-link>
    <h1 @click="openImg('https://www.baidu.com/img/bd_logo1.png')">
      打开图片
    </h1>
    <chat-bubble mode="window" />
  </div>
</template>

<script src="./home.js"></script>

<style lang="scss" scoped>
.home {
  font-size: 18px;
}
</style>
