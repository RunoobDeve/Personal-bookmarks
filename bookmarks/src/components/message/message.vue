<template>
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div class="bk-message" v-show="visible">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      message: "信息",
      type: "success",
      duration: 3000,
      visible: false,
    };
  },
  props: {},
  methods: {
    messageHide() {
      this.visible = false;
    },
    messageShow() {
      this.visible = true;
    },
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>

<style lang="less">
.bk-message {
  position: fixed;
  width: 280px;
  height: 24px;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  background-color: red;
  border-radius: 5px;
  color: #fff;
  line-height: 48px;
  height: 48px;
  text-align: center;
}
.message-fade-enter-active {
  -webkit-animation: message-fade-in.3s;
  animation: message-fade-in.3s;
}
.message-fade-leave-active {
  -webkit-animation: message-fade-out.3s;
  animation: message-fade-out.3s;
}
@keyframes message-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes message-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>