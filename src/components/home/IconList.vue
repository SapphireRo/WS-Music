<template>
    <div class="iconList">
        <div class="iconItem">            
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg>
            <span>每日推荐</span>
        </div>  
        <div class="iconItem">            
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shipin"></use>
            </svg>
            <span>私人FM</span>
        </div>  
        <div class="iconItem">            
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofanggedan"></use>
            </svg>
            <span>歌单</span>
        </div>  
        <div class="iconItem">            
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>  
    </div>
</template>

<style lang="less" scoped>
    .iconList{
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .iconItem{
            width: 25%;
            height: 100%;
            margin-top: 0.8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                width: .8rem;
                height: .8rem;
            }
        }
    }
</style>