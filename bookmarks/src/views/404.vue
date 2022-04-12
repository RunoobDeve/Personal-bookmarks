<template>
  <div class="system">
    <img src="../assets/img/404.png" />
    <div class="title">
      <h2>页面走丢了...</h2>
      <h4>远方的朋友你好！非常抱歉，您所请求的页面不存在！</h4>
      <h4>请仔细检查您输入的网址是否正确。</h4>
      <a href="/">回到首页</a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.system {
  text-align: center;
  background-color: #7395ff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1000;
  padding-top: 140px;
}
.system img {
  text-align: center;
  width: 500px;
}
.title h2 {
  color: #fff;
  font-size: 36px;
  letter-spacing: 4px;
  text-align: center;
  line-height: 120px;
}
.title h4 {
  color: #fff;
  font-size: 18px;
  /* font-weight: bold; */
  line-height: 38px;
  text-align: center;
}

.title a {
  display: inline-block;
  height: 40px;
  padding: 0 30px;
  border-radius: 50px;
  cursor: pointer;
  z-index: 3;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;
  line-height: 40px;
  margin-top: 20px;
  background: linear-gradient(
    90deg,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4
  ); /*渐变背景*/
  border-radius: 60px; /*边框圆角*/
  background-size: 400%; /*背景大小*/
  z-index: 1; /*层叠定位*/
  position: relative;
}

a:hover {
  animation: animate 8s linear infinite alternate; /*动画: 名称 时间 线性 循环 播放完回退播放*/
}
@keyframes animate {
  0% {
    background-position: 0%; /*修改背景定位，实现渐变色炫光*/
  }
  50% {
    background-position: 100%;
  }
  100% {
    background-position: 0%;
  }
}
.title a::before {
  content: ""; /*内容*/
  position: absolute; /*绝对定位*/
  top: -5px; /*当设置对立的2个定位属性时，元素的大小将由对立的大小决定*/
  left: -5px;
  right: -5px;
  bottom: -5px; /*当设置对立的2个定位属性时，元素的大小将由对立的大小决定*/
  z-index: -1;
  background: linear-gradient(
    90deg,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4
  );
  border-radius: 40px;
  background-size: 400%;
  filter: blur(20px); /*过渡：模糊*/
  opacity: 0; /*透明度*/
  transition: 1s; /*过渡时间*/
}
a:hover::before {
  opacity: 1;
  animation: animate 8s linear infinite; /*注意动画名称统一*/
}
</style>