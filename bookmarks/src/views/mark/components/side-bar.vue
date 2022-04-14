<template>
  <div id="siderbar">
    <div class="siderbar-logo">
      <a href="/">
        <img
          src="/static/img/logo1.png"
          alt=""
        />
      </a>
    </div>
    <div class="siderbar-menu">
      <ul>
        <li
          @click="changeMenu(0)"
          :class="['menu-item', activeIndex == 0 ? 'active' : '']"
        >
          <span>我的</span>
        </li>
        <li
          @click="changeMenu(index + 1)"
          v-for="(item, index) in resource"
          :key="index"
          :class="['menu-item', activeIndex == index + 1 ? 'active' : '']"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="siderbar-slogan">我的个人书签</div>
  </div>
</template>

<script>
import resourceJson from "@/server/resource.json";
import { throttle } from "@/utils/commonUtil.js";
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
  width: 200px;
  box-shadow: 0 0 4px 0 rgba(41, 48, 66, 0.1);
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
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
    overflow-y: overlay;
    flex: 1;
    .menu-item {
      line-height: 42px;
      color: #555;
      cursor: pointer;
      position: relative;
      .iconfont {
        position: absolute;
        right: 10px;
        top: 0;
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
  }
  .siderbar-slogan {
    padding: 20px 0;
  }
}
</style>