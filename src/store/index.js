import { getMusicLyric } from '@/request/api/item.js';
import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{  //给播放列表添加默认值
      al: {
        id: 138773843,
        name: "The Nights",
        pic: 109951166925141730,
        picUrl: "https://p1.music.126.net/4sh1Yty6qPO25PHWvhHAGw==/109951166925141728.jpg",
        pic_str: "109951166925141728"
      },
      id: 1911442482,
      name: "The Nights",
      ar: [{
        name: "Alyson Mary"
      }]
    }],
    playListIndex: 0,//默认下标为0
    isbtnShow: true,//播放-暂停按钮的显示
    detailShow: false,//歌曲详情页
    lyricList: {}, //歌词部分
    currentTime: 0, //当前时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断是否登录
    isFooter: true, //底部组件是否显示
  },
  getters: {
  },
  // 改变状态
  mutations: {
    updataIsbtnShow: function (state, value) {
      state.isbtnShow = value;
    },
    //添加到歌单
    pushPlayList: function (state, value) {
      state.playList.push(value);
    },
    updataPlayList: function (state, value) {
      state.playList = value;
      console.log(state.playList);
    },
    updataPlayListIndex: function (state, value) {
      state.playListIndex = value;
    },
    updataDetailShow: function (state) {
      state.detailShow = !state.detailShow;
    },
    updataLyricList: function (state, value) {
      state.lyricList = value;
    },
    updataCurrentTime: function (state, value) {
      //console.log(state.currentTime);
      state.currentTime = value;
    },
    updataDuration: function (state, value) {
      state.duration = value
    },
  },
  //异步获取歌词数据
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      console.log(res);
      context.commit("updataLyricList", res.data.lrc)
    }
  },
  modules: {
  }
})
