import Vue from 'vue'
import messageComponent from './message'
const messageConstructor = Vue.extend(messageComponent)
function messageFun(options) {
    console.log(options)
    let { message, type, duration } = options
    const messageDom = new messageConstructor({
        el: document.createElement('div'),
        data() {
            return {
                message: message,
                type: type,
            }
        }
    })
    document.body.appendChild(messageDom.$el)
    duration = duration || 3000
    messageDom.messageShow()
    setTimeout(() => {
        messageDom.messageHide()
    }, duration)
}
function registerMessage() {
    window.$message = Vue.prototype.$message = messageFun
}

export default registerMessage
