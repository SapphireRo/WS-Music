<template>
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <div class="detailTop">
        <div class="detailLeft">
            <svg class="icon liebiao" aria-hidden="true" @click="backHome">
              <use xlink:href="#icon-zuojiantou1" ></use>
            </svg>
            <div class="leftMarquee">
                <Vue3Marquee style="color:#fff">
                    {{ musicList.name }}
                </Vue3Marquee>
                <p v-for="item in musicList.ar" :key="item">
                    {{ item.name }}
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                     </svg>
                </p>
                
            </div>
        </div>
        <div class="detailRgiht">
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
        </div>
    </div>
    <div class="detailContent" v-show="!isLyricShow" >
        <img src="@/assets/zhizhen.png" alt="" class="needle" :class="{needle_active:!isbtnShow}">
        <img src="@/assets/cipan.png" alt="" class="cd">
        <img :src="musicList.al.picUrl" alt="" class="pic" @click="isLyricShow=true" :class="{pic_active:!isbtnShow,pic_paused:isbtnShow}">
    </div>
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow=false">
        <p v-for="item in lyric" 
        :key="item" 
        :class="{active:(currentTime *1000>=item.time && currentTime*1000<item.pre)}">
            {{ item.lrc}}
        </p>
    </div>
    <div class="detailFooter">
        <div class="footerTop">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-56aixin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai-wenjianxiazai-07-copy"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiaoxizhongxin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-liebiao--copy"></use>
            </svg>
        </div>
        <div class="footerContent">
            <input type="range" 
             class="range" 
             min="0" :max="duration" v-model="currentTime" >
        </div>
        <div class="footer">
            <svg class="icon " aria-hidden="true">
              <use xlink:href="#icon-hanhan-01-01"></use>
            </svg>
            <svg class="icon " aria-hidden="true" @click="goPlay(-1)">
              <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg>
            <svg class="icon bofang " aria-hidden="true" v-if="isbtnShow" @click="play">
              <use xlink:href="#icon-bofang-copy"></use>
            </svg>
            <svg class="icon bofang " aria-hidden="true" v-else @click="play">
              <use xlink:href="#icon-pauseCircle-copy"></use>
            </svg>
            <svg class="icon " aria-hidden="true"  @click="goPlay(1)">
              <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg>
            <svg class="icon " aria-hidden="true">
              <use xlink:href="#icon-liebiao2-copy"></use>
            </svg>
        </div>
    </div>
</template>

<script>
import  Vue3Marquee  from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations,mapState } from 'vuex';
export default{
    data(){
        return{
            isLyricShow:false
        }
    },
    computed:{
        ...mapState(["lyricList", "currentTime", "playListIndex", "playList","duration"]),
        //切割歌词字符串为数组 
        lyric:function(){
            let arr;
            if(this.lyricList.lyric){
                arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min=item.slice(item.indexOf('[')+1,item.indexOf(':'));
                    let sec=item.slice(item.indexOf(':')+1,item.indexOf('.'));
                    let mill=item.slice(item.indexOf('.')+1,item.indexOf(']'));
                    let lrc=item.slice(item.indexOf(']')+1,item.length);
                    let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
                    //console.log(min,sec,mill,lrc);
                    return {min,sec,mill,lrc,time}
                    
                })
                arr.forEach((item,i) => {
                    if(i===arr.length-1 || isNaN(arr[i+1].time)){
                        item.pre=10000
                    }else{
                        item.pre=arr[i+1].time
                    }
                });
            }        
           console.log(arr);
            return arr;
        }
    },
    mounted(){
        //console.log(this.musicList);
        //console.log(this.lyricList.lyric); //看歌词
        this.addDuration();
    },
    props:['musicList','isbtnShow','play','addDuration','duration'],
    methods:{
        backHome: function () {
            this.isLyricShow = false;
            this.updataDetailShow();
        },
        goPlay: function (num) {
            let index = this.playListIndex + num;
             if (index < 0) {
                index = this.playList.length - 1;
            } else if (index == this.playList.length) {
                index = 0;
            }
            this.updataPlayListIndex(index);
        },
        ...mapMutations(['updataDetailShow','updataPlayListIndex','updataPlayList','updataDuration']),
    },
    components:{
        Vue3Marquee,
    },
    watch:{
        currentTime:function(newValue){
            let p=document.querySelector("p.active")
            console.log([p]);
            if(p){
                if(p.offsetTop>300){
                this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
                }   
            }
            if(newValue===this.duration){
                if(this.playListIndex===this.playList.length-1){
                    this.updataPlayListIndex(0);
                    this.play()
                }else{
                    this.updatePlayListIndex(this.playListIndex+1);
                 }
             }
        }
    }

}
</script>

<style lang="less">
.bgimg{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
}
.detailTop{
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;
    .detailLeft{
        display: flex;
        align-items: center;
        .leftMarquee{
            width: 3rem;
            height: 100%;
            margin-left: 0.3rem;
            .icon{
                width: 0.3rem;
                height: 0.3rem;
                fill:#999;
            }
            p{
                color:#999;
            }
           
        }
    }
}
.detailContent{
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .needle{
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-20deg);
        transition: all 2s;
    }
    .needle_active{
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(0deg);
        transition: all 2s;
    }
    .cd{
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: -1;
    }
    .pic{
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        //添加动画
        animation: rotate_pic 10s linear infinite;
    }

    //动画
    .pic_active{
        animation-play-state: running;
    }
    .pic_paused{
        animation-play-state: paused;
    }
    @keyframes rotate_pic {
        0%{
            transform: rotateZ(0deg);
        }
        100%{
            transform: rotateZ(365deg);
        }
    }
}
.detailFooter{
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .footerTop{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
        width: 0.36rem;
        height: 0.36rem;
        fill: rgb(245, 234, 234);
         }
        .icon {
         width: 0.6rem;
        height: 0.6rem;
        }
       
    }
    .range{
        width: 100%;
        height: 0.06rem;
    }
    .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
      fill: rgb(245, 234, 234);
    }
  }
}

// 歌词
.musicLyric{
    width: 100%;
    height: 7.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: .2rem;
    overflow: scroll;
    p{
        color: rgb(223, 217, 217);
        margin-bottom: .3rem;
        //溢出滚动条

    }
    .active{
        color: #fff;
        font-size: 0.4rem;
    }
}
</style>