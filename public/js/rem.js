// 移动端适应配置
function remSize() {
    //获取设备宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth
    //设备过大时统一设置为iphone678模型
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }
    //字体大小 750px--> 1rem=100px  350px--> 1rem=50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
    //设置字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem';
}
//调用函数
remSize();
//当窗口发生变化时
window.onresize = function () {
    remSize();
}