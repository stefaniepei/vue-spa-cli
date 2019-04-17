<template>
  <div class="home">
    <router-link to="/">Home</router-link> |
    <router-link to="/demo">Demo by Decorators</router-link> |
    <router-link to="/image">image</router-link>

    <chat-bubble mode="pc" />
  </div>
</template>

<script src="./home.js"></script>

<style lang="scss" scoped>
.home {
  font-size: 18px;
}
</style>
