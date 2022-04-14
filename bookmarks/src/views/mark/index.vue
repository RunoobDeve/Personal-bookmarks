<template>
  <div>
    <siderBar></siderBar>
    <Header></Header>
    <div class="main-content">
      <div class="banner-img"></div>
      <div class="classify-box">
        <div class="handle">
          <img
            title="导入收藏"
            @click="importJson"
            src="/static/img/import.svg"
            alt=""
          />
          <img
            title="导出收藏"
            @click="exportJson"
            src="/static/img/export.svg"
            alt=""
          />
          <input
            style="display: none"
            type="file"
            accept=".json"
            ref="jsonInput"
            id="json"
          />
        </div>
        <a id="mark0" class="classify-title">我的</a>
        <div class="mark-box">
          <a
            :href="item.url"
            target="_blank"
            v-for="(item, index) in myCollect"
            :key="index"
            class="mark-item"
          >
            <div class="mark-logo">
              <!-- <img :src="'/static/img/' + item.image" alt="" /> -->
              <img :src="item.url | webDomain" alt="" />
            </div>
            <div>
              <a :href="item.url" target="_blank" class="mark-name">{{
                item.name
              }}</a>
              <div class="mark-desc">{{ item.description }}</div>
            </div>
            <div @click.prevent="delCollect(index)" class="mark-check">
              <i class="iconfont icondel"></i>
            </div>
          </a>
          <div class="mark-add" @click="addFlag = true">
            <i class="iconfont iconjiahao"></i>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in resource" :key="index" class="classify-box">
        <a :id="'mark' + (index + 1)" class="classify-title">{{ item.name }}</a>
        <div class="mark-box">
          <a
            :href="mark.url"
            target="_blank"
            v-for="(mark, markIndex) in item.site"
            :key="markIndex"
            class="mark-item"
          >
            <div class="mark-logo">
              <img :src="'/static/img/' + mark.image" alt="" />
            </div>
            <div>
              <a :href="mark.url" target="_blank" class="mark-name">{{
                mark.name
              }}</a>
              <div class="mark-desc">{{ mark.description }}</div>
            </div>
            <div
              v-if="collectIds.indexOf(mark.id) == -1"
              @click.prevent="addCollect(index, markIndex, mark.id)"
              class="mark-check"
            >
              <i class="iconfont iconjiahao"></i>
            </div>
            <div
              v-else
              @click.prevent="addCollect(index, markIndex, mark.id)"
              class="mark-check"
            >
              <i class="iconfont icondel"></i>
            </div>
          </a>
        </div>
      </div>
      <div class="web-desc"></div>
      <div v-show="addFlag" class="form-mask" @click="addFlag = false"></div>
      <div :class="['site-form', addFlag ? 'show-form' : '']">
        <div class="add-title">添加至我的个人书签</div>
        <div class="form-item">
          <div class="site-title">资源名称</div>
          <input
            class="site-input"
            v-model="siteForm.name"
            type="text"
            placeholder="请勿重复资源名称且小于20个字符"
          />
        </div>
        <div class="form-item">
          <div class="site-title">资源地址</div>
          <input
            class="site-input"
            v-model="siteForm.url"
            type="text"
            placeholder="合法的 url，以 http/https 开头"
          />
        </div>
        <div class="form-item">
          <div class="site-title">资源描述</div>
          <textarea
            class="site-textarea"
            v-model="siteForm.description"
            type="text"
            placeholder="资源描述"
          />
        </div>
        <div class="form-btn">
          <span @click="addSite">确定</span>
          <span @click="addFlag = false">取消</span>
        </div>
      </div>
    </div>
    <toolBar></toolBar>
  </div>
</template>

<script>
import resourceJson from "@/server/resource.json";
import toolBar from "./components/tool-bar.vue";
import siderBar from "./components/side-bar.vue";
import Header from "./components/header.vue";
import { nanoid } from "nanoid";
export default {
  data() {
    return {
      resource: resourceJson,
      myCollect: [],
      addFlag: false,
      siteForm: {
        name: "",
        url: "",
        description: "",
        id: "",
      },
    };
  },
  components: {
    toolBar,
    siderBar,
    Header,
  },
  methods: {
    addCollect(typeIndex, markIndex, id) {
      var idIndex = this.collectIds.indexOf(id);
      if (idIndex == -1) {
        let site = this.resource[typeIndex].site[markIndex];
        this.myCollect = [...this.myCollect, site];
        localStorage.setItem("myCollect", JSON.stringify(this.myCollect));
      } else {
        this.myCollect.splice(idIndex, 1);
      }
    },
    delCollect(index) {
      this.myCollect.splice(index, 1);
      localStorage.setItem("myCollect", JSON.stringify(this.myCollect));
    },
    exportJson() {
      var data = JSON.stringify(this.myCollect);
      console.log(data);
      let uri = "data:text/json;charset=utf-8," + encodeURIComponent(data);
      let link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download = "我的收藏夹.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    importJson() {
      this.$nextTick(() => {
        this.$refs.jsonInput.click();
      });
    },
    addSite() {
      if (!this.siteForm.name || this.siteForm.name.length > 20) {
        alert("网站资源名称不符合规范");
        return false;
      }
      var urlReg =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&=]*)/;
      if (!urlReg.test(this.siteForm.url)) {
        alert("不是合法的URL");
        return false;
      }
      let id = nanoid();
      this.siteForm.id = id;
      this.myCollect = [...this.myCollect, Object.assign({}, this.siteForm)];
      this.siteForm.name = "";
      this.siteForm.url = "";
      this.siteForm.description = "";
      this.addFlag = false;
      localStorage.setItem("myCollect", JSON.stringify(this.myCollect));
    },
  },
  filters: {
    webDomain(url) {
      let domain = url.split("/");
      if (domain[2]) {
        return "https://api.iowen.cn/favicon/" + domain[2] + ".png";
      } else {
        return "";
      }
    },
  },
  computed: {
    collectIds() {
      return this.myCollect.map((item) => {
        return item.id;
      });
    },
  },
  mounted() {
    let inputDom = document.getElementById("json");
    inputDom.addEventListener("change", (event) => {
      let reader = new FileReader();
      reader.readAsText(event.target.files[0]);
      reader.onloadend = () => {
        const myCollect = JSON.parse(reader.result);
        this.myCollect = [...this.myCollect, ...myCollect];
        localStorage.setItem("myCollect", JSON.stringify(this.myCollect));
      };
    });
  },
  created() {
    var myCollect = localStorage.getItem("myCollect");
    if (myCollect) {
      myCollect = JSON.parse(myCollect);
      if (myCollect instanceof Array) {
        this.myCollect = myCollect;
      }
    }
  },
};
</script>

<style lang="less">
.banner-img{
  background-image: url('/static/img/sky1.jpg');
  height: 200px;
  background-repeat: no-repeat;
  border-radius: 5px;
  background-size: cover;
  background-position: center center;
}
.classify-box {
  padding-top: 10px;
  .handle {
    position: absolute;
    right: 0;
    top: 4px;
    img {
      margin-left: 10px;
      cursor: pointer;
    }
  }
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
      box-shadow: 0px 0px 10px -5px rgba(158, 158, 158, 0.1);
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      height: 90px;
      position: relative;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0px 0px 20px -5px rgba(158, 158, 158, 0.2);
        transform: translateY(-6px);
        .mark-check {
          opacity: 1;
        }
      }
      .mark-logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        flex-shrink: 0;
        padding: 5px;
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
      .mark-check {
        position: absolute;
        right: 10px;
        top: 10px;
        opacity: 0;
        transition: all 0.3s;
        i {
          color: #2ed573;
          font-size: 18px;
        }
      }
    }
  }
  .mark-add {
    background: rgba(136, 136, 136, 0.1);
    border: 2px dashed rgba(136, 136, 136, 0.5);
    border-radius: 5px;
    padding: 10px;
    height: 90px;
    position: relative;
    text-align: center;
    cursor: pointer;
    i {
      font-size: 32px;
      line-height: 70px;
      color: #666;
    }
  }
}
.web-desc {
  height: 1000px;
}
.form-mask {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(33, 33, 33, 0.5);
  z-index: 1000;
}
.site-form {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  width: 320px;
  padding: 40px 20px;
  transition: all 0.5s;
  transform: translateX(400px);
  z-index: 1001;
  .add-title {
    font-size: 18px;
    color: #000;
    font-weight: bold;
  }
  .form-item {
    margin-top: 30px;
    .site-title {
      font-size: 16px;
      color: #666;
      line-height: 24px;
    }
    .site-input {
      width: 100%;
      border: unset;
      background-color: #f5f5f5;
      border-radius: 5px;
      line-height: 32px;
      padding: 5px 10px;
      outline: none;
      margin-top: 10px;
    }
    .site-textarea {
      width: 100% !important;
      border: unset;
      background-color: #f5f5f5;
      border-radius: 5px;
      line-height: 32px;
      padding: 5px 10px;
      outline: none;
      margin-top: 10px;
      height: 120px;
    }
  }
  .form-btn {
    margin-top: 20px;
    height: 40px;
    span {
      width: 80px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      display: inline-block;
      margin-left: 20px;
      background-color: #999;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      float: right;
      &:hover {
        opacity: 0.9;
      }
    }
  }
  &.show-form {
    transform: translateX(0);
  }
}
</style>