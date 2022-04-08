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
        <li @click="changeMenu(1)" class="menu-item">
          <a href="#mark1">菜单1</a>
        </li>
        <li @click="changeMenu(2)" class="menu-item">
          <a href="#mark2">菜单2</a>
        </li>
        <li @click="changeMenu(3)" class="menu-item">
          <a href="#mark3">菜单3</a>
        </li>
        <li @click="changeMenu(4)" class="menu-item">
          <a href="#mark">菜单4</a>
        </li>
      </ul>
    </div>
    <div class="siderbar-slogan">slogan</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 1,
    };
  },
  methods: {
    changeMenu(index) {
      if (index != this.activeIndex) {
        // 滚动
        this.activeIndex = index;
        var scrollTop = document.getElementById("mark" + index).offsetTop;
        console.log( document.getElementById("mark" + index))
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = (scrollTop - 70);
      }
    },
  },
  mounted() {},
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
      &:hover {
        background-color: red;
        color: #fff;
      }
    }
  }
  .siderbar-slogan {
    padding: 20px 0;
  }
}
</style>