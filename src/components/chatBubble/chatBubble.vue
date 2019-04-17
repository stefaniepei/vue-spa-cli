<template>
  <section class="app_chatBubble" :class="mode">
    <span>{{ mode }} Chat</span>
  </section>
</template>
<script lang="js" src="./chatBubble.js"></script>
<style lang="scss" scoped>
.app_chatBubble.window {
  span {
    font-size: 20px;
    color: #666;
  }
}
.app_chatBubble.pc {
  span {
    font-size: 18px;
    color: #333;
  }
}
.app_chatBubble.mobile {
  span {
    font-size: 16px;
    color: rgb(153, 153, 153);
  }
}
</style>
