<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="updataDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑切换上下首哦</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon liebiao" aria-hidden="true" @click="play" v-if="isbtnShow">
              <use xlink:href="#icon-bofang" ></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
              <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
              <use xlink:href="#icon-xinzengdaohangliebiao_o"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`">
        </audio>
        <!-- 弹出层 -->
        <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%' ,width:'100%'}" >
            <MusicDetail
            :musicList="playList[playListIndex]" 
            :play="play" 
            :isbtnShow="isbtnShow" 
            :addDuration="addDuration"/>
        </van-popup>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';
import MusicDetail from './MusicDetail.vue';
export default{
    data(){
        return{
            interVal:0
        }
    },
    computed:{
        ...mapState(['playList','playListIndex','isbtnShow','detailShow','duration'])
    },
    mounted(){
        console.log(this.$refs);
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id);
        this.updateTime()
    },
    methods:{
        play:function(){
            //判断音乐是否播放
            if(this.$refs.audio.paused){
                this.$refs.audio.play();
                this.updataIsbtnShow(false);
                //播放时触发定时器
                this.updateTime();
            }
            else{
                this.$refs.audio.pause();
                this.updataIsbtnShow(true);
                //清除定时器
                clearInterval(this.interVal);
            }     
        },
        addDuration:function(){
            this.updataDuration(this.$refs.audio.duration)
        },
        updateTime: function () {
            this.interVal = setInterval(() => {
                this.updataCurrentTime(this.$refs.audio.currentTime);
            }, 1000);
        },
        ...mapMutations(['updataIsbtnShow','updataDetailShow','updataCurrentTime',"updataDuration"])
    },
    watch:{
        playListIndex:function(){ //监听如果下标发生改变就自动播放音乐
            this.$refs.audio.autoplay=true;
            if(this.$refs.audio.paused){ //如果是暂停状态，点击之后会改变
                this.updataIsbtnShow(false)
            }
        },
        playList:function(){
            if(this.isbtnShow){ 
                this.$refs.audio.autoplay=true;
                this.updataIsbtnShow(false);
            }
        }
    },
   
    components:{
        MusicDetail
    },
    updated(){
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
        this.addDuration()
    }
}
</script>

<style lang="less" scoped>
.FooterMusic{
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    border-top: 1px solid #999;
    bottom: 0;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    .footerLeft{
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;      
    }
    span{
        font-size: .25rem;
    }
    p{
        font-weight:600;
    }
}
    .footerRight{
        width: 20%;
        height: 1rem;
        display: flex;
        justify-content:space-between;
        align-items: center;
        .icon{
            width: 0.6rem;
            height: 0.6rem;
        }
    }
}

</style>

