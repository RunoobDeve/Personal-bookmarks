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
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
        <li class="menu-item"><a href="">菜单1</a></li>
      </ul>
    </div>
    <div class="siderbar-slogan">slogan</div>
  </div>
</template>

<script>
export default {};
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
    }
  }
  .siderbar-slogan {
    padding: 20px 0;
  }
}
</style>