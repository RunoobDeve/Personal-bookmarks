<template>
  <div
    id="header"
    :style="{ left: device == 'mobile' ? 0 : sidebar.width + 'px' }"
  >
    <div :class="['toggle-btn', isCollapse ? 'active' : '']" @click="toggle">
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3"></div>
    </div>
    <div>
      <!-- <span class="avator">头像</span>
      <span class="search">搜索</span> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isToggle: false,
    };
  },
  computed: {
    ...mapGetters(["sidebar", "isCollapse", "device"]),
  },
  methods: {
    toggle() {
      this.$store.dispatch("handleLeftMenu");
    },
  },
};
</script>

<style lang="less">
#header {
  position: fixed;
  top: 0;
  right: 0;
  height: 60px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 2px 0 rgba(41, 48, 66, 0.1);
  background-color: var(--theme-header-bg);
  z-index: 100;
  transition: all 0.3s;
  .toggle-btn {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 5px 0;
    height: 30px;
    cursor: pointer;
    div {
      width: 20px;
      height: 2px;
      background-color: #666;
      border-radius: 2px;
      transition: all 0.3s ease-in-out;
    }
    &:hover {
      div {
        background-color: #2ed573;
      }
    }
    &.active {
      .line1 {
        width: 12px;
      }
      .line3 {
        width: 12px;
      }
    }
  }
}
</style>