<template>
    <div class="fanhui">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou1"></use>
        </svg>
    </div>
    <div class="login">
      <div class="loginTop">登录</div>
      <div class="loginContent">
        <input
          type="text"
          name="phone"
          class="phone"
          placeholder="请输入手机号码"
        />
        <input
          type="password"
          name="passworld"
          class="passworld"
          placeholder="请输入密码"
        />
        <button class="btn">登录</button>
      </div>
    </div>
  </template>

<style lang="less" scoped>
.fanhui{
    width: 100%;
    height: 100%;
    
}
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(221,44,29);
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 1.5rem;
    .phone,
    .passworld {
      width: 4rem;
      height: .7rem;
      border: 0.02rem solid #999;
    }
    .btn{
        width: 2rem;
        height: .6rem;
    }
  }
}
</style>
