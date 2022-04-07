<template>
  <div id="app" class="light-mode">
    <siderBar></siderBar>
    <Header></Header>
    <div class="main-content">
      <router-view />
    </div>
    <toolBar></toolBar>
  </div>
</template>
<script>
import toolBar from "@/components/tool-bar.vue";
import siderBar from "@/components/side-bar.vue";
import Header from "@/components/header.vue";
export default {
  data() {
    return {};
  },
  components: {
    toolBar,
    siderBar,
    Header,
  },
  methods: {},
  created() {},
};
</script>
<style lang="less">
</style>
