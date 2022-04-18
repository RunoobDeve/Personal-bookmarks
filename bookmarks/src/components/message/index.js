import Vue from 'vue'
import messageComponent from './message'
const messageConstructor = Vue.extend(messageComponent)
let seed = 1
let instances = []
function messageFun(options) {
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
    let id = 'bk_message_'+seed++
    document.body.appendChild(messageDom.$el)
    messageDom.id=id
    let styleTop = 80
    instances.forEach(item=>{
        styleTop += item.$el.offsetHeight + 16
    })
    messageDom.styleTop = styleTop
    messageDom.messageShow()
    instances.push(messageDom)
    duration = duration || 3000
    setTimeout(() => {
        let length = instances.length;
        messageDom.messageHide();
        let removedHeight = messageDom.$el.offsetHeight;
        let index = instances.findIndex(e=>e.id === messageDom.id)
        if(length>1){
            for(let i=index;i<length;i++){
                let dom = instances[i].$el
                dom.style['top'] = parseInt(dom.style['top'],10) -removedHeight-80+'px'
            }
        }
        instances.splice(index,1)
    }, duration)
}
function registerMessage() {
    window.$message = Vue.prototype.$message = messageFun
}

export default registerMessage
