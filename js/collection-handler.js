// Get the 'type' parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const urlType = urlParams.get('type');
const storedType = localStorage.getItem('type');

// 确定使用哪个type值
let type;
if (!urlType) {
    // URL参数为空，使用localStorage中的值，如果也为空则使用默认值
    type = storedType || 'president';
} else {
    // 检查请求的类型对应的文件夹是否存在
    const testImage = new Image();
    testImage.src = `../collections/${urlType}/1.png`;
    
    type = urlType;
    testImage.onerror = () => {
        type = 'president';
        localStorage.setItem('type', type);
        updateImages();
    };
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

// 初始调用更新图片
updateImages();