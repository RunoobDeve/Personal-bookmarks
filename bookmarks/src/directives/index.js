import imgLazy from "./imgLazy"

export default {
    install(Vue) {
        Vue.directive('imgLazy', imgLazy)
    }
}
