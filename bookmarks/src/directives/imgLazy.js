const imgLazy = {
    inserted() {
    },
    bind(el, binding) {
        let lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                let lazyImage = entry.target;
                // 相交率，默认是相对于浏览器视窗
                if (entry.intersectionRatio > 0) {
                    let domain = binding.value.split("/");
                    if (domain[2]) {
                        lazyImage.src = "https://api.iowen.cn/favicon/" + domain[2] + ".png";
                    } else {
                        lazyImage.src = "";
                    }

                    // 当前图片加载完之后需要去掉监听
                    lazyImageObserver.unobserve(lazyImage);
                }

            })
        })
        lazyImageObserver.observe(el);
    },
    update() {
    },
    componentUpdated() {
    },
    unbind() {
    }
}

export default imgLazy