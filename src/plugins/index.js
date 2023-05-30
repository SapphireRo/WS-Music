//插件集中管理
import { Button, Swipe, SwipeItem, Popup } from 'vant';
//放入数组种
let plugins = [
    Swipe, SwipeItem, Button, Popup
]
//循环遍历拿到每一个数据S
export default function getVant(app) {
    plugins.forEach((item) => {
        return app.use(item)
    })
}