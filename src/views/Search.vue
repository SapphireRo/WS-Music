<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou1"></use>
        </svg>
        <input type="text" placeholder="陈奕迅"
         @keydown.enter="enterKey"
         v-model="searchKey">
    </div>
    <div class="searchHistory">
        <span class="history">历史</span>
        <span v-for="item in keyWordList" 
        :key="item" class="spankey"
        @click="searchHistory(item)">
            {{ item }}
        </span>
        <svg class="icon" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
          </svg>
    </div>
    <div class="itemList">
        <div class="item" v-for="(item, i) in searchList" :key="i">
          <div class="itemLeft" @click="updataIndex(item,i)" >
            <span class="leftSpan">{{ i + 1 }}</span>
            <div>
              <p>{{ item.name }}</p>
              <span v-for="(item1, index) in item.artists" :key="index">
              {{item1.name}}</span>
            </div>
          </div>
          <div class="itemRight">
            <svg class="icon bofang" aria-hidden="true" v-if='item.mv !=0'>
              <use xlink:href="#icon-shipin"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
              <use xlink:href="#icon-liebiao2"></use>
            </svg>
          </div>
        </div>
      </div>
</template>
<script>
import { getSearchMusic } from '@/request/api/home'
export default{
    data(){
        return{
            keyWordList:[],
            searchKey:"",
            searchList:[]
        }
    },
    mounted(){
        this.keyWordList=JSON.parse(localStorage.getItem('keyWordList'))||[]
    },
    methods:{
        enterKey:async function(){
            if(this.searchKey!==" "){
                this.keyWordList.unshift(this.searchKey)||[]
                 //去重
                this.keyWordList=[...new Set(this.keyWordList)]
                //固定长度
                if(this.keyWordList.length>5){
                    this.keyWordList.pop()
                }
                localStorage.setItem("keyWordList",JSON.stringify(this.keyWordList));
                //搜索
                let res=await getSearchMusic(this.searchKey)
                this.searchList=res.data.result.songs
                this.searchKey=""
                
            }else{
                this.searchKey=null
            }
        },
        delHistory:function(){
            localStorage.removeItem("keyWordList")
            this.keyWordList=[]
        },
        searchHistory:async function(item){
            let res=await getSearchMusic(item)
            console.log(res);
            this.searchList=res.data.result.songs
        },
        updataIndex:function(item){
        item.al=item.album
        item.al.picUrl=item.album.artist.img1v1Url
        this.$store.commit("pushPlayList",item)
        this.$store.commit("updataPlayListIndex",this.$store.state.playList.length-1)
       
        }
    },
}
</script>
<style lang="less">
.searchTop{
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    input{
        width: 85%;
        margin-left: 0.2rem;
        border:none;
        border-bottom: 1px solid #999;
        padding: 0.1rem;
    }
}
.searchHistory{
    width: 100%;
    padding: 0.1rem;
    position: relative;
    .history{
        font-weight: 700;
    }
    .spankey{
        padding: .1rem .2rem;
        background-color: rgb(196, 189, 189);
        border-radius: .4rem;
        margin: 0.1rem .2rem;
    }
    .icon{
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        right: .2rem;
    }

}
.itemList {
    width: 100%;
    height: 10rem;
    background-color: #fff;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
      .item {
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .itemLeft {
          width: 85%;
          height: 100%;
          display: flex;
          align-items: center;
          .leftSpan {
            display: inline-block;
            width: 0.2rem;
            text-align: center;
          }
          div {
            p {
              width: 4.54rem;
              height: .4rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 700;
            }
            span{
              font-weight: 400;
              font-size: .24rem;
              color: #999;
            }
            margin-left: 0.3rem;
          }
        }
        .itemRight{
          width: 20%;
          height: 100%;
          display: flex;
          // justify-content: space-between;
          align-items: center;
          position: relative;
          .icon{
            fill: #999;
          }
           .bofang{
              position: absolute;
              left: 0;
            }
           .liebiao{
              position: absolute;
              right: 0;
            }
        }
      }
    }
</style>