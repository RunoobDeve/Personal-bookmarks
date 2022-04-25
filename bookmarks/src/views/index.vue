<template>
  <div class="index">
    <div class="about-me">
      <a href="/" target="_blank" class="github"
        ><img src="/static/img/github.png" alt=""
      /></a>
    </div>
    <div class="web-introduce">
      <h2 class="introduce-title">你的个人书签</h2>
      <p class="introduce-desc">
        是一个资源导航网站，精选国内外优质网站，让每个人都能找到自己需要的资源
      </p>
      <router-link class="introduce-link" to="/mark"> 点击体验 </router-link>
    </div>
  </div>
</template>

<script>
export default {
  created() {
  },
};
</script>

<style lang="less">
.index {
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(135deg, #fce38a, #f38181);
  .about-me {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .web-introduce {
    background-image: linear-gradient(135deg, #fff6b7, #f6416c);
    width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 150px 40px;
    border-radius: 10px;
    .introduce-title {
      background: linear-gradient(135deg, #f7941e, #72c6ef, #00a651);
      background-clip: text;
      color: transparent;
      background-size: 100%;
      display: inline-block;
    }
    .introduce-desc {
      font-size: 18px;
      line-height: 32px;
      margin: 20px 0 50px;
      color: #666;
    }
    .introduce-link {
      font-size: 16px;
      font-weight: 400;
      font-family: "Poppins", sans-serif;
      padding: 0 32px;
      line-height: 56px;
      text-align: center;
      outline: 0;
      color: #fff;
      border: 0;
      border-radius: 100px;
      display: inline-block;
      position: relative;
      background: linear-gradient(to right, #f92c8b 0, #b02cd6 100%);
      box-shadow: 0 10px 15px 0 rgba(175, 0, 202, 20%);
      overflow: hidden;
      &:before {
        content: "";
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        top: 20px;
        right: -50px;
        background: rgba(255, 255, 255, 0.1);
        transition: all 0.5s;
      }
      &:hover::before {
        top: -10px;
        right: -20px;
      }
    }
  }
}
</style>