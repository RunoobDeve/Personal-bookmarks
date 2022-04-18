<template>
  <div style="position: relative">
    <span ref="trigger">
      <slot> </slot>
    </span>
    <div
      class="tooltip"
      v-bind:class="{
        top: placement === 'top',
        left: placement === 'left',
        right: placement === 'right',
        bottom: placement === 'bottom',
        visible: show === true,
      }"
      ref="popover"
      role="tooltip"
    >
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner" v-html="content">
        <!-- <slot name="content" v-html="content"></slot> -->
      </div>
    </div>
  </div>
</template>


<script>
import EventListener from "./eventListener.js";
export default {
  data() {
    return {
      show: false,
      position: {
        top: 0,
        left: 0,
      },
    };
  },
  props: {
    trigger: {
      type: String,
      default: "click",
    },
    effect: {
      type: String,
      default: "fadein",
    },
    content: {
      type: String,
    },
    placement: {
      type: String,
    },
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
  },
  watch: {
    show(val) {
      console.log(val);
    },
  },
  mounted() {
    if (!this.$refs.popover)
      return console.error(
        "Couldn't find popover ref in your component that uses popoverMixin."
      );
    // 获取监听对象
    const triger = this.$refs.trigger.children[0];
    console.log(triger)
    // 根据trigger监听特定事件
    if (this.trigger === "hover") {
      this._mouseenterEvent = EventListener.listen(triger, "mouseenter", () => {
        this.show = true;
      });
      this._mouseleaveEvent = EventListener.listen(triger, "mouseleave", () => {
        this.show = false;
      });
    } else if (this.trigger === "focus") {
      this._focusEvent = EventListener.listen(triger, "focus", () => {
        this.show = true;
      });
      this._blurEvent = EventListener.listen(triger, "blur", () => {
        this.show = false;
      });
    } else {
      this._clickEvent = EventListener.listen(triger, "click", this.toggle);
    }
    this.show = !this.show;
  },
  beforeDestroy() {
    if (this._blurEvent) {
      this._blurEvent.remove();
      this._focusEvent.remove();
    }
    if (this._mouseenterEvent) {
      this._mouseenterEvent.remove();
      this._mouseleaveEvent.remove();
    }
    if (this._clickEvent) this._clickEvent.remove();
  },
};
</script>

<style lang="less">
.tooltip {
  position: absolute;
  visibility: hidden;
  border: 1px solid #aaa;
  background: #fff;
  z-index: 2;
  &.visible {
    visibility: visible;
  }
}
</style>