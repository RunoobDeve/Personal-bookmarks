import store from '@/store'

const { body } = document
const WIDTH = 780 // refer to Bootstrap's responsive design

export default {
    // watch: {
    //     $route() {
    //         console.log(123)
    //         if (this.device === 'mobile' && this.sidebar.opened) {
    //             store.dispatch('closeSideBar', { withoutAnimation: false })
    //         }
    //     }
    // },
    beforeMount() {
        window.addEventListener('resize', this.$_resizeHandler)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resizeHandler)
    },
    mounted() {
        const isMobile = this.$_isMobile()
        if (isMobile) {
            store.dispatch('toggleDevice', 'mobile')
            store.dispatch('closeLfetMenu')
        }
    },
    methods: {
        $_isMobile() {
            const rect = body.getBoundingClientRect()
            return rect.width < WIDTH
        },
        $_resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.$_isMobile()
                store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')
                if (isMobile) {
                    store.dispatch('closeLfetMenu')
                }
            }
        }
    }
}
