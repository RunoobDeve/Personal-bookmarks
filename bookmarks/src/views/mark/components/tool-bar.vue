<template>
  <div class="tool-bar">
    <div class="tool-top" @click="toTop">
      <div class="triangle"></div>
    </div>
    <!-- <div
        @click="toggleTheme"
        :class="['tool-theme', theme == 'light' ? 'light-theme' : 'dark-theme']"
      >
        <i v-show="theme == 'light'" class="iconfont icontaiyang-copy"></i>
        <i v-show="theme == 'dark'" class="iconfont iconmoonbyueliang"></i>
      </div> -->
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
      if (this.theme == "light") {
        this.theme = "dark";
      } else {
        this.theme = "light";
      }
    },
    toTop() {
      let scrollTop = document.documentElement.scrollTop;
      let timer = setInterval(() => {
        if (scrollTop > 0) {
          scrollTop -= 20;
          document.documentElement.scrollTop = scrollTop;
        } else {
          clearInterval(timer);
        }
      }, 10);
    },
  },
};
</script>

<style lang="less" scoped>
// @import "../../styles/theme.less";
.tool-bar {
  position: fixed;
  right: 10px;
  bottom: 200px;
  z-index: 10000;
  .tool-top {
    background-color: rgba(160, 139, 255, 0.8);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 2px rgb(160, 139, 255);
    padding-top: 6px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    .triangle {
      border: 8px solid;
      width: 0;
      margin: 0 auto;
      border-color: transparent transparent #fff transparent;
    }
    &:before {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 50%;
      transform: scale(0);
      background-color: rgba(255, 255, 255, 0.2);
      content: "";
    }
    &:hover::before {
      animation: zoom 0.3s;
    }
    @keyframes zoom {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
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
</style>