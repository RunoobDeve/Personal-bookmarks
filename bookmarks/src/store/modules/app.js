const types = {
    HANDLE_LEFT_MENU: 'handle_left_menu',
    TOOGGLE_DEVICE: "toggle_device",
    CLOSE_LEFT_MENU: 'close_left_menu',
    TOGGLE_THEME :'toggle_theem',
}
const menu = {
    state: {
        isCollapse: false, // 菜单默认展开
        maxLeftMenuWidth: 200,//最大宽度
        minLeftMenuWidth: 50,//最小宽度
        sidebar: {
            opened: true,
            width: 200
        },
        device: "desktop",
        theme: localStorage.getItem('theme') || "light"
    },
    getters: {
        sidebar: state => state.sidebar,
        isCollapse: state => state.isCollapse,
        device: state => state.device,
        theme: state => state.theme,
    },
    mutations: {
        [types.HANDLE_LEFT_MENU](state) {
            if (state.isCollapse) {
                state.sidebar.opened = true
                state.sidebar.width = state.maxLeftMenuWidth
            } else {
                state.sidebar.opened = false
                state.sidebar.width = state.minLeftMenuWidth
            }
            state.isCollapse = !state.isCollapse
        },
        [types.TOOGGLE_DEVICE](state, device) {
            state.device = device
        },
        [types.CLOSE_LEFT_MENU](state) {
            state.sidebar.opened = false
            state.isCollapse = true
        },
        [types.TOGGLE_THEME](state,theme){
            state.theme = theme
            localStorage.setItem('theme',theme)
        }

    },
    actions: {
        handleLeftMenu: ({ commit }) => {
            commit(types.HANDLE_LEFT_MENU)
        },
        toggleDevice: ({ commit }, device) => {
            commit(types.TOOGGLE_DEVICE, device)
        },
        closeLfetMenu: ({ commit }) => {
            commit(types.CLOSE_LEFT_MENU)
        },
        toggleTheme:({commit},theme)=>{
            commit(types.TOGGLE_THEME,theme)
        }
    }
}

export default menu