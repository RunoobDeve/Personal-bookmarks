<template>
  <div id="siderbar" :style="{ width: sidebar.width + 'px' ,left:( device=='mobile' && isCollapse) ? '-200px' : '0'}">
    <router-link class="siderbar-logo" to="/">
      <img v-if="!isCollapse" src="/static/img/logo.png" alt="" />
      <img v-else src="/static/img/favicon.png" alt="" />
    </router-link>
    <div :class="['siderbar-menu', isCollapse ? 'isCollapse' : '']">
      <ul>
        <li
          @click="changeMenu(0)"
          :class="['menu-item', activeIndex == 0 ? 'active' : '']"
        >
          <i class="iconfont iconwode"></i>
          <span>我的</span>
        </li>
        <li
          @click="changeMenu(index + 1)"
          v-for="(item, index) in resource"
          :key="index"
          :class="['menu-item', activeIndex == index + 1 ? 'active' : '']"
        >
          <i :class="['iconfont',item.icon]"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div v-if="!isCollapse" class="siderbar-slogan">你的个人书签</div>
  </div>
</template>

<script>
import resourceJson from "@/server/resource.json";
import { throttle } from "@/utils/commonUtil.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeIndex: 0,
      resource: resourceJson,
    };
  },
  methods: {
    changeMenu(index) {
      if (index != this.activeIndex) {
        // 滚动
        this.activeIndex = index;
        // var scrollTop = document.getElementById("mark" + index).offsetTop;
        // document.documentElement.scrollTop = scrollTop - 80;
        var scrollTop = document.getElementById("mark" + index).offsetTop - 80; //需要滚动的距离
        var totalTop = document.documentElement.scrollTop; //已经滚动的距离
        var totalTopRemaind = totalTop % 10;
        var scrollTopRemaind = scrollTop % 10;
        scrollTop -= scrollTopRemaind;
        totalTop -= totalTopRemaind;
        let timer = setInterval(() => {
          if (scrollTop > totalTop) {
            totalTop += 10;
            document.documentElement.scrollTop = totalTop;
          } else if (scrollTop < totalTop) {
            totalTop -= 10;
            document.documentElement.scrollTop = totalTop;
          } else {
            totalTop += scrollTopRemaind;
            document.documentElement.scrollTop = totalTop;
            clearInterval(timer);
          }
        }, 5);
      }
    },
    scrool() {
      var classifyArr = document.getElementsByClassName("classify-box");
      for (var i = 0; i < classifyArr.length; i++) {
        if (classifyArr[i].getBoundingClientRect().top >= 60) {
          this.activeIndex = i;
          break;
        }
      }
    },
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.app.isCollapse,
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
    }),
  },
  mounted() {
    document.addEventListener("scroll", throttle(this.scrool, 10));
  },
};
</script>

<style lang="less">
#siderbar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  box-shadow: 0 0 4px 0 rgba(41, 48, 66, 0.1);
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  transition: all 0.3s;
  z-index: 102;
  .siderbar-logo {
    height: 60px;
    background-color: #fff;
    vertical-align: middle;
    img {
      max-height: 40px;
      vertical-align: middle;
      margin-top: 10px;
    }
  }
  .siderbar-menu {
    // overflow-y: overlay;
    flex: 1;
    .menu-item {
      line-height: 42px;
      color: #555;
      cursor: pointer;
      position: relative;
      .iconfont{
        color: #555;
        margin-right: 5px;
      }
      &.active {
        background-color: #f1eeff;
        .sub-menu {
          height: auto;
        }
      }
      &:hover {
        background-color: rgba(241, 238, 255, 0.5);
      }
    }
    &.isCollapse {
      .menu-item {
        .iconfont{
          margin-right: 0;
        }
        span {
          display: none;
          position: absolute;
          top: 0;
          right: -125px;
          width: 120px;
          background-color: rgb(241, 238, 255);
          z-index: 100;
          border-radius: 4px;
          &::before {
            position: absolute;
            left: -10px;
            margin-top: -5px;
            top: 50%;
            content: "";
            border: 5px solid rgb(241, 238, 255);
            border-color: transparent rgb(241, 238, 255) transparent transparent;
          }
        }
        &:hover {
          span {
            display: block;
          }
        }
      }
    }
  }
  .siderbar-slogan {
    padding: 20px 0;
  }
}
</style>