<template>
  <div id="siderbar">
    <div class="siderbar-logo">
      <a href="/">
        <img
          src="http://jiafangbb.com/wp-content/uploads/2022/03/xinjiafang.png"
          alt=""
        />
      </a>
    </div>
    <div class="siderbar-menu">
      <ul>
        <li
          @click="changeMenu(index)"
          v-for="(item, index) in resource"
          :key="index"
          :class="['menu-item', activeIndex == index ? 'active' : '']"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="siderbar-slogan">slogan</div>
  </div>
</template>

<script>
import resourceJson from "../server/resource.json";
import { throttle } from "../utils/commonUtil.js";
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
        var scrollTop = document.getElementById("mark" + index).offsetTop;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop - 60;
      }
    },
    scrool() {
      var classifyArr = document.getElementsByClassName("classify-box");
      for (var i = 0; i < classifyArr.length; i++) {
        console.log(classifyArr[i].getBoundingClientRect().top,i);
        if (classifyArr[i].getBoundingClientRect().top >= 60) {
          this.activeIndex = i;
          console.log(i);
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
    }
  }
  .siderbar-menu {
    overflow-y: overlay;
    flex: 1;
    .menu-item {
      line-height: 32px;
      padding: 5px 0;
      color: #555;
      cursor: pointer;
      &.active {
        background-color: #f1eeff;
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