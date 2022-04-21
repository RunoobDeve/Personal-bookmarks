<template>
  <div id="app" :data-theme="theme" :class="[theme == 'light' ? 'light-mode' : 'dark-mode']">
    <router-view />
  </div>
</template>
<script>
import { mapGetters} from 'vuex'
export default {
  data() {
    return {};
  },
  computed:{
    ...mapGetters(['theme'])
  },
  methods: {},
  created() {},
};
</script>
<style lang="less">
</style>
