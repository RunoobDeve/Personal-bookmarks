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
    <div :class="['sky', theme == 'dark' ? 'dark-sky' : 'dark-sky']">
      <div class="sky-planet">
        <div class="sky-sun"></div>
      </div>
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
.sky {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  transition: 3s ease all;
  opacity: 0;
  .sky-planet {
    z-index: 1999999999;
    position: fixed;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    transform-origin: center bottom;
    transition: 2s cubic-bezier(0.7, 0, 0, 1) all;
    .sky-sun {
      position: absolute;
      left: 35%;
      top: 40%;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      content: "";
      background: linear-gradient(#fefefe, #fffbe8);
    }
  }
  &.dark-sky {
    background-image: linear-gradient(135deg, #614385, #516395);
    animation: showSky 2s ease-in-out;
    .sky-planet {
      animation: moonRoate 2s ease-in-out;
      animation-delay: .5s;
    }
  }
  &.light-sky {
    background-image: linear-gradient(135deg, #fad7a1, #e96d71);
    animation: showSky 2s ease-in-out;
    .sky-planet {
      animation: sunRoate 2s ease-in-out;
      animation-delay: .5s;
    }
  }
}
@keyframes sunRoate {
  0% {
    transform: rotateZ(0deg);
  }
  25% {
    transform: rotateZ(90deg);
  }
  50% {
    transform: rotateZ(180deg);
  }
  75% {
    transform: rotateZ(270deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
@keyframes moonRoate {
  0% {
    transform: rotateZ(0deg);
  }
  25% {
    transform: rotateZ(90deg);
  }
  50% {
    transform: rotateZ(180deg);
  }
  75% {
    transform: rotateZ(270deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
@keyframes showSky {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>