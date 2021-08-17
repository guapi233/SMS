<template>
  <div class="layer">
    <div class="header">
      <p class="page-oper-title">{{ title }}</p>
    </div>

    <div class="content">
      <slot></slot>
    </div>

    <div class="back"></div>
  </div>
</template>
<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss">
.layer {
  width: 100vw;
  height: 100vh;

  .header {
    height: 44px;
    line-height: 44px;
    background-color: #009587;
    padding: 0 155px;

    .page-oper-title {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
  }

  .content {
    width: 1600px;
    margin: 0 auto;
    min-height: calc(100vh - 44px);
    background-color: #fff;
    box-shadow: 0 1px 4px rgb(0 0 0 / 28%);
    overflow: hidden;
  }

  .back {
    position: fixed;
    z-index: -1;
    background-color: #009587;
    width: 100vw;
    top: 0;
    left: 0;
    height: 320px;
  }
}
</style>
