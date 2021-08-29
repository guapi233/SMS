<template>
  <router-view/>
</template>
<script>
import { isRunnigMobile } from "./hook";

export default {
  setup() {
    isRunnigMobile();
  },
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>