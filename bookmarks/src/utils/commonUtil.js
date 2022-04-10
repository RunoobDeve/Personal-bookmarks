// 函数防抖
function debouce(fun, wait) {
    let timer;
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fun()
        }, wait);
    }
}

// 函数节流

function throttle(fun, wait) {
    let timer;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fun()
                timer = null
            }, wait)
        }
    }

}

export {
    debouce,
    throttle
}