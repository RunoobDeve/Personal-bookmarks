<template>
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'bk-message',
        {
          success: type === 'success',
          error: type === 'error',
          info: type === 'info',
          warning: type === 'warning',
        },
      ]"
      :style="{ top: styleTop + 'px' }"
      v-show="visible"
    >
      <i v-if="type === 'success'" class="iconfont iconzhengque"></i>
      <i v-if="type === 'warning'" class="iconfont iconjinggao"></i>
      <i v-if="type === 'error'" class="iconfont iconcuowu"></i>
      <i v-if="type === 'info'" class="iconfont iconinfo"></i>
      <span> {{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      message: "信息信息信息信息信息信息信息信息信",
      type: "success",
      duration: 3000,
      visible: false,
      styleTop: 20,
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
  min-width: 280px;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  border-radius: 4px;
  line-height: 18px;
  padding: 15px;
  text-align: center;
  z-index: 10000;
  font-size: 14px;
  border: 1px solid #ebeef5;
  &.success {
    background-color: #f0f9eb;
    color: #67c23a;
  }
  &.error {
    background-color: #fef0f0;
    color: #f56c6c;
  }
  &.info {
    background-color: #f0f9eb;
    color: #909399;
  }
  &.warning {
    background-color: #fdf6ec;
    color: #e6a23c;
  }
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