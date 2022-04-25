<template>
  <div>
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="closeLeftMenu"
    />
    <siderBar></siderBar>
    <Header></Header>
    <div
      class="main-content"
      :style="{ marginLeft: device == 'mobile' ? 0 : sidebar.width + 'px' }"
    >
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
            accept="application/json,text/html"
            ref="jsonInput"
            id="json"
          />
        </div>
        <a id="mark0" class="classify-title">我的</a>
        <div class="mark-box">
          <div
            class="mark-item"
            v-for="(item, index) in myCollect"
            :key="index"
          >
            <a :href="item.url" target="_blank" class="mark-wrapper">
              <div class="mark-logo">
                <!-- <img :src="'/static/img/' + item.image" alt="" /> -->
                <img :src="item.url | webDomain" alt="" />
              </div>
              <div class="mark-info">
                <a
                  :href="item.url"
                  target="_blank"
                  :title="item.name"
                  class="mark-name"
                  >{{ item.name }}</a
                >
                <div class="mark-desc">{{ item.description }}</div>
              </div>
              <div @click.prevent="delCollect(index)" class="mark-check">
                <i class="iconfont icondel"></i>
              </div>
            </a>
          </div>
          <div class="mark-item">
            <div class="mark-add" @click="showAddForm">
              <i class="iconfont iconjiahao"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in resource" :key="index" class="classify-box">
        <a :id="'mark' + (index + 1)" class="classify-title">{{ item.name }}</a>
        <div class="mark-box">
          <div
            class="mark-item"
            v-for="(mark, markIndex) in item.site"
            :key="markIndex"
          >
            <a :href="mark.url" target="_blank" class="mark-wrapper">
              <div class="mark-logo">
                <!-- <img :src="mark.url | webDomain" alt="" /> -->
                <img v-imgLazy="mark.url" alt="" />
              </div>
              <div class="mark-info">
                <a
                  :href="mark.url"
                  target="_blank"
                  :title="mark.name"
                  class="mark-name"
                  >{{ mark.name }}</a
                >
                <div class="mark-desc" :title="mark.description">
                  {{ mark.description }}
                </div>
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
      </div>
      <div class="web-desc"></div>
      <div v-show="addFlag" class="form-mask" @click="hideAddForm"></div>
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
          <div class="btn btn-confirm" @click="addSite">
            <span class="btn-text">确定</span>
          </div>
          <div class="btn btn-cancel" @click="hideAddForm">取消</div>
        </div>
      </div>
    </div>
    <toolBar></toolBar>
  </div>
</template>

<script>
import resourceJson from "@/server/data.json";
import toolBar from "./components/tool-bar.vue";
import siderBar from "./components/side-bar.vue";
import Header from "./components/header.vue";
import resize from "@/mixin/resize";
// const htmlparser2 = require('htmlparser2')
import { nanoid } from "nanoid";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      imgLazy: "https://api.iowen.cn/favicon/www.iconfont.cn.png",
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
  mixins: [resize],
  methods: {
    closeLeftMenu() {
      this.$store.dispatch("handleLeftMenu");
    },
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
      if (this.myCollect.length == 0) {
        this.$message({
          type: "warning",
          message: "我的收藏为空",
        });
        return false;
      }
      var data = JSON.stringify(this.myCollect);
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
    showAddForm() {
      this.addFlag = true;
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    },
    hideAddForm() {
      this.addFlag = false;
      document.getElementsByTagName("body")[0].style.overflow = "overlay";
    },
    addSite() {
      if (!this.siteForm.name || this.siteForm.name.length > 20) {
        this.$message({
          message: "网站资源名称不符合规范",
          type: "warning",
        });
        return false;
      }
      var urlReg =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&=]*)/;
      if (!urlReg.test(this.siteForm.url)) {
        this.$message({
          message: "不是合法的URL",
          type: "warning",
        });
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
    ...mapGetters(["sidebar", "isCollapse", "device"]),
  },
  mounted() {
    let inputDom = document.getElementById("json");
    inputDom.addEventListener("change", (event) => {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onloadend = () => {
        if (file.type == "text/html") {
          let htmlString = reader.result;
          let dom = document.createElement("div");
          dom.innerHTML = htmlString;
          let linkArr = dom.getElementsByTagName("a");
          let markArr = []
          for (var i = 0; i < linkArr.length; i++) {
            let obj = {};
            obj.url = linkArr[i].href;
            obj.id = linkArr[i].getAttribute('add_date');
            obj.name = linkArr[i].innerHTML;
            markArr.push(obj)
          }
          this.myCollect = [...this.myCollect,...markArr]
        } else {
          const myCollect = JSON.parse(reader.result);
          this.myCollect = [...this.myCollect, ...myCollect];
          localStorage.setItem("myCollect", JSON.stringify(this.myCollect));
        }
        return false;
        // const myCollect = JSON.parse(reader.result);
        // this.myCollect = [...this.myCollect, ...myCollect];
        // localStorage.setItem("myCollect", JSON.stringify(this.myCollect));
        // this.$message({
        //   type: "success",
        //   message: "导入成功",
        // });
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
.drawer-bg {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(33, 33, 33, 0.8);
  z-index: 101;
}
.main-content {
  margin-top: 60px;
  padding: 20px;
  transition: all 0.3s;
  background-color: var(--theme-body-bg);
}
.banner-img {
  background-image: url("/static/img/sky.jpg");
  height: 200px;
  background-repeat: no-repeat;
  border-radius: 5px;
  background-size: cover;
  background-position: center center;
}
.classify-box {
  padding-top: 10px;
  .handle {
    float: right;
    margin-top: 14px;
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
    color: var(--theme-title-color);
    display: block;
  }
  .mark-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: repeat(5, 1fr);
    // grid-row-gap: 15px;
    // grid-column-gap: 15px;
    .mark-item {
      padding: 5px 10px;
      width: 20%;
      .mark-wrapper {
        background-color: var(--theme-site-bg);
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

        .mark-info {
          overflow: hidden;
        }

        .mark-name {
          font-weight: bold;
          color: var(--theme-primary-color);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: block;
          padding-right: 10px;
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
  background-color: var(--theme-form-bg);
  width: 320px;
  padding: 40px 20px;
  transition: all 0.5s;
  transform: translateX(400px);
  z-index: 1001;
  .add-title {
    font-size: 18px;
    color: var(--theme-primary-color);
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
      background-color: var(--theme-form-item-bg);
      border-radius: 5px;
      line-height: 32px;
      padding: 5px 10px;
      outline: none;
      margin-top: 10px;
      border: 1px solid transparent;
      color: var(--theme-primary-color);
      &:focus {
        border-color: #2ed573;
      }
    }
    .site-textarea {
      width: 100% !important;
      border: unset;
      background-color: var(--theme-form-item-bg);
      border-radius: 5px;
      line-height: 32px;
      padding: 5px 10px;
      outline: none;
      margin-top: 10px;
      height: 120px;
      border: 1px solid transparent;
      color: var(--theme-primary-color);
      resize: none;
      &:focus {
        border-color: #2ed573;
      }
    }
  }
  .form-btn {
    margin-top: 20px;
    height: 40px;
    .btn {
      width: 100px;
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
    }
    .btn-confirm {
      background: radial-gradient(
        circle,
        rgba(247, 150, 192, 1) 0%,
        rgba(118, 174, 241, 1) 100%
      );
      line-height: 42px;
      position: relative;
      &::before,
      &::after {
        position: absolute;
        content: "";
        height: 0%;
        width: 1px;
        box-shadow: -1px -1px 20px 0px rgb(255, 255, 255),
          -4px -4px 5px 0px rgb(255, 255, 255),
          7px 7px 20px 0px rgba(0, 0, 0, 40%),
          4px 4px 5px 0px rgba(0, 0, 0, 30%);
        transition: all 0.3s;
        z-index: 10;
      }
      &::before {
        left: 0;
        top: 0;
      }
      &::after {
        right: 0;
        bottom: 0;
      }
      .btn-text {
        width: 100%;
        height: 100%;
        display: inline-block;
        position: relative;
        &::before,
        &::after {
          position: absolute;
          content: "";
          box-shadow: -1px -1px 20px 0px rgb(255, 255, 255),
            -4px -4px 5px 0px rgb(255, 255, 255),
            7px 7px 20px 0px rgba(0, 0, 0, 40%),
            4px 4px 5px 0px rgba(0, 0, 0, 30%);
          transition: all 0.3s;
          height: 1px;
          width: 0%;
        }
        &::before {
          left: 0;
          top: 0;
        }
        &::after {
          right: 0;
          bottom: 0;
        }
        &:hover {
          background: #fff;
          color: #76aef1;
          &::before {
            width: 100%;
          }
          &::after {
            width: 100%;
          }
        }
      }
      &:hover {
        &::before {
          height: 100%;
        }
        &::after {
          height: 100%;
        }
      }
    }
    .btn-cancel {
      color: #fff;
      border-radius: 5px;
      font-family: "Lato", sans-serif;
      font-weight: 500;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      display: inline-block;
      outline: none;
      background-color: #89d8d3;
      background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
      border: none;
      z-index: 1;
      &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        border-radius: 5px;
        background-color: #4dccc6;
        background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
        box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
          7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
        transition: all 0.3s ease;
      }
      &:hover::after {
        top: 0;
        height: 100%;
      }
    }
  }
  &.show-form {
    transform: translateX(0);
  }
}
@media screen and (max-width: 1440px) {
  .classify-box .mark-box .mark-item {
    width: 25%;
  }
}
@media screen and (max-width: 1280px) {
  .classify-box .mark-box .mark-item {
    width: 33%;
  }
}
@media screen and (max-width: 780px) {
  .classify-box .mark-box .mark-item {
    width: 100%;
  }
}
</style>