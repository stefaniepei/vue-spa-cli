<template>
  <div class="img">
    <router-link to="/">Home</router-link> |
    <router-link to="/demo">Demo by Decorators</router-link> |
    <router-link to="/image">image</router-link>
    <img :src="imgSrc" alt="image" />
  </div>
</template>
<script src="./image.js"></script>
<style lang="scss" scoped>
.img {
  width: 400px;
  height: 300px;
}
</style>
