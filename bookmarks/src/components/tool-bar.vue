<template>
  <div>
    <div class="tool-bar">
      <div class="tool-top">
        <div class="triangle"></div>
      </div>
      <div
        @click="toggleTheme"
        :class="['tool-theme', theme == 'light' ? 'light-theme' : 'dark-theme']"
      >
        <i v-show="theme == 'light'" class="iconfont icontaiyang-copy"></i>
        <i v-show="theme == 'dark'" class="iconfont iconmoonbyueliang"></i>
      </div>
    </div>
    <div :class="['sunday', theme == 'dark' ? 'active' : '']">
      <!-- <div class="moon">
        <i class="iconfont iconmoonbyueliang"></i>
      </div> -->
      <i class="iconfont icontaiyang-copy"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "light",
    };
  },
  methods: {
    toggleTheme() {
      console.log(this.theme);
      if (this.theme == "light") {
        this.theme = "dark";
      } else {
        this.theme = "light";
      }
    },
  },
};
</script>

<style lang="less">
@import "../styles/theme.less";
.tool-bar {
  position: absolute;
  right: 10px;
  bottom: 300px;
  z-index: 10000;
  .tool-top {
    background-color: #333;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 2px #333;
    padding-top: 6px;
    box-sizing: border-box;
    cursor: pointer;
    .triangle {
      border: 8px solid;
      width: 0;
      margin: 0 auto;
      border-color: transparent transparent #fff transparent;
    }
  }
  .tool-theme {
    background-color: #333;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 2px #333;
    box-sizing: border-box;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    .iconfont {
      font-size: 24px;
      color: #fff;
      line-height: 40px;
      transition: all 0.3s ease-in-out;
    }
  }
}
.sunday {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 200%;
  height: 200%;
  transition: all 1s ease-in-out;
  background-image: linear-gradient(135deg, #fce38a, #f38181);
  opacity: 0.2;
  .iconfont {
    font-size: 200px;
    margin-top: 200px;
    display: inline-block;
  }
  &.active {
    .iconfont {
      transform: rotateZ(180deg);
      transform-origin: center bottom;
    }
  }
}
</style>