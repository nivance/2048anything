// Get the 'type' parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const urlType = urlParams.get('type');
const storedType = localStorage.getItem('type');

console.log("urlType=" + urlType + "   storedType=" + storedType)


let restartGame = false;
// 确定使用哪个type值
let type;
if (!urlType) {
    // URL参数为空，使用localStorage中的值，如果也为空则使用默认值
    type = storedType || 'president';
} else {
    // 如果 urlType 与 storedType 相同，直接使用该值
    if (urlType === storedType) {
        type = urlType;
    } else {
        // 检查请求的类型对应的文件夹是否存在
        const testImage = new Image();
        testImage.src = `../collections/${urlType}/1.png`;
        
        type = urlType;
        testImage.onerror = () => {
            console.log("error type = " + type)
            type = 'president';         // default type
        };
        restartGame = true;
    }
}

// 存储最终使用的type值
localStorage.setItem('type', type);

// 更新图片路径的函数
function updateImages() {
    for (let i = 1; i <= 14; i++) {
        const imagePath = `url("../collections/${type}/${i}.png")`;
        document.documentElement.style.setProperty(`--image-${i}-path`, imagePath);
    }
}

console.log("updateImages ==== " + type + "  restartGame=" + restartGame)

if (restartGame) {
    console.log("restartGame=" + restartGame);
    // 等待 DOM 完全加载后再触发重启
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(() => {
            // 尝试两种方式触发重启
            const restartButton = document.querySelector(".restart-button");
            if (restartButton) {
                restartButton.click();
            } else {
                const event = new KeyboardEvent("keydown", {
                    key: "r",
                    keyCode: 82,
                    which: 82,
                    bubbles: true
                });
                document.dispatchEvent(event);
            }
        }, 100); // 添加小延迟确保游戏完全初始化
    });
}
// 初始调用更新图片
updateImages();