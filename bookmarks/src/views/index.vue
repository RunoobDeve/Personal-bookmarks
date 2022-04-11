<template>
  <div>
    <div style="height:100px"></div>
    <div v-for="(item, index) in resource" :key="index" class="classify-box">
      <a :id="'mark'+index" class="classify-title">{{ item.name }}</a>
      <div class="mark-box">
        <div
          v-for="(mark, markIndex) in item.site"
          :key="markIndex"
          class="mark-item"
        >
          <div class="mark-logo">
            <img
              src="https://afterwork-design.github.io/castalia/images/site/iconfont.png"
              alt=""
            />
          </div>
          <div>
            <a :href="mark.url" target="_blnak" class="mark-name">{{ mark.name }}</a>
            <div class="mark-desc">{{ mark.description }}</div>
          </div>
          <div class="mark-check"></div>
        </div>
      </div>
    </div>
    <div class="web-desc"></div>
  </div>
</template>

<script>
import resourceJson from "../server/resource.json";
export default {
  data() {
    return {
      resource: resourceJson,
    };
  },
  methods: {},
};
</script>

<style lang="less">
.classify-box {
  .classify-title {
    font-size: 16px;
    line-height: 32px;
    font-weight: bold;
    margin: 10px 0;
    color: #666;
    display: block;
  }
  .mark-box {
    display: grid;
    // align-items: center;
    // flex-wrap: wrap;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 15px;
    grid-column-gap: 15px;
    .mark-item {
      background-color: #fff;
      border-radius: 5px;
      padding: 10px;
      box-shadow: 0px 0px 20px -5px rgba(158, 158, 158, 0.2);
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      height: 90px;
      .mark-logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        flex-shrink: 0;
        img {
          width: 100%;
        }
      }
      .mark-name {
        font-weight: bold;
        color: #000;
      }
      .mark-desc {
        color: #a0aec0;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 22px;
        margin-top: 5px;
      }
    }
  }
}
.web-desc{
  height: 1000px;
}
</style>