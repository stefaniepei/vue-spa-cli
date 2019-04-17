<template>
  <section class="runx_chatBubble" :class="mode">
    <span>{{ mode }} Chat</span>
  </section>
</template>
<script lang="js" src="./chatBubble.js"></script>
<style lang="scss" scoped>
.runx_chatBubble.pc {
  span {
    font-size: 18px;
    color: #333;
  }
}
.runx_chatBubble.mobile {
  span {
    font-size: 16px;
    color: rgb(153, 153, 153);
  }
}
</style>
