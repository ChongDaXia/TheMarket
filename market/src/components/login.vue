<template>
    <div class="login">
        <div class="login-box">
            <div class="title">登录</div>
            <Form ref="loginForm" :model="loginForm" :rules="loginFormRule">
                <FormItem class="form-item" prop="username">
                    <div class="inp">
                        <Input placeholder="请输入用户名" v-model="loginForm.username"></Input>
                    </div>
                    <Icon type="md-person" />
                </FormItem>
                <FormItem class="form-item" prop="password">
                    <div class="inp">
                        <Input type="password" placeholder="请输入密码" v-model="loginForm.password"></Input>
                    </div>
                    <Icon type="md-lock" />
                </FormItem>
                <FormItem class="form-item" prop="role">
                    <RadioGroup v-model="loginForm.role">
                        <Radio label="用户"></Radio>
                        <Radio label="管理员"></Radio>
                    </RadioGroup>
                </FormItem>
                <div class="form-item">
                    <Button class="login-btn" shape="circle" long @click="handleSubmit('loginForm')">登录</Button>
                </div>
            </Form>
        </div>
        <div class="login-text">
            <div class="web-title">XUHONGMEI</div>
            <div class="web-text">商业中心管理系统</div>
            <div class="web-text-min">
              <p>Business center</p>
              <p>management system</p>
            </div>
            <div class="stars"></div>
            <div class="twinkling"></div>
            <div class="clouds"></div>
        </div>
        <div class="login-bg">
          22
        </div>
    </div>
</template>
<script>
import {login} from '../http/moudules/login'
export default {
  data () {
    // 自定义验证规则
    const usernameCheck = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const passwordCheck = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    // 表单字段
    return {
      // 登录表单字段
      loginForm: {
        username: '',
        password: '',
        role: '用户'
      },
      // 登录表单验证
      loginFormRule: {
        username: [
          {
            validator: usernameCheck,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: passwordCheck,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 登录表单验证
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let logindata = {
            userName: this.$refs[name].model.username,
            password: this.$refs[name].model.password,
            role: this.$refs[name].model.role
          }
          login(logindata).then(data => {
            if(data.code == '200'){
              //登录成功
              this.$store.dispatch('setUserId', data.userId).then(() => {
                this.$Message.info({
                  content: '登录成功！',
                  duration: 3
                })
                localStorage.setItem('role',  this.$refs[name].model.role)
                localStorage.setItem('userId',  data.userId)
                localStorage.setItem('Flag', 'isLogin')
                this.$router.push({name: 'home'})
              })
            }
            if(data.code == "500") {
              //登录失败
              this.$Message.error('用户名或者密码错误')
            }
            if(data.code == "300") {
              //无权限
              this.$Message.error('请重新选择登录权限')
            }
          })
        } else {
          this.$Message.error('请输入用户名或者密码')
        }
      })
    }
  }
}
</script>
<style scoped>
.login {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
}
.login-box {
    width: 400px;
    position: fixed;
    z-index: 20;
    right: 15%;
    top: 20%;
    background: #ffffff;
    box-shadow: 0 4px 100px rgba(80, 80, 80, 0.15);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px 40px;
}
.login-text{
  width: 70%;
  height: 100%;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  background: #0f1a35;
  box-sizing: border-box;
  padding: 50px 60px;
}
.login-bg{
  width: 50%;
  height: 110%;
  position: absolute;
  z-index: 0;
  right: -10%;
  top: -10%;
}
.web-title{
  width: 100%;
  position: relative;
  font-size: 40px;
  font-weight: 400;
  margin: 10px 0 20px 0;
  color: #0f1a35;
}
.web-text{
  width: 100%;
  text-align: left;
  font-size: 80px;
  color: #ffffff;
  font-weight: 500;
}
.web-text-min{
  width: 100%;
  text-align: left;
  font-size: 60px;
  color: #ffffff;
  font-weight: 500;
}
.title {
    width: 100%;
    position: relative;
    margin: 30px 0 60px 0;
    text-align: center;
    font-size: 40px;
    font-weight: 400;
    color: #000;
}
.form-item {
    width: 320px;
}
.inp {
    float: left;
    width: 278px;
    font-size: 20px;
}
i {
    width: 32px;
    height: 32px;
    margin-left: 10px;
    font-size: 24px;
    text-align: center;
    line-height: 32px;
    color: #d9d9d9;
}
.login-btn {
    height: 60px;
    background: #344267;
    color: #ffffff;
    border-color: #344267;
    padding: 0;
    font-size: 22px;
    margin-bottom: 30px;
    font-family: sans-serif;
}
@keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-webkit-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-moz-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@-moz-keyframes move-twink-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -10000px 5000px;
  }
}
@keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0px;
  }
}
@-webkit-keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0px;
  }
}
@-moz-keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0px;
  }
}
@-moz-keyframes move-clouds-back {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10000px 0px;
  }
}
.stars,
.twinkling,
.clouds{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.stars{
  background: #000000 url(https://cdn.kuaiyugo.com/plat/CMS/prod/static_files/stars.png?6494ab5b3760b5e2cc46f5566a245371) repeat top center;
  z-index: -3;
}
.twinkling{
  background: transparent url(https://cdn.kuaiyugo.com/plat/CMS/prod/static_files/twinkling.png?5a05442668c03ba1cf80ca8bdc3f3e96) repeat top center;
  z-index: -2;
  -moz-animation: move-twink-back 200s linear infinite;
  -ms-animatiom: move-twink-back 200s linear infinite;
  -o-animation: move-twink-back 200s linear infinite;
  -webkit-animation: move-twink-back 200s linear infinite;
  animation: move-twink-back 200s linear infinite;
}
.clouds{
  background: transparent url(https://cdn.kuaiyugo.com/plat/CMS/prod/static_files/clouds.png?79e8fa64a8503259d3ff45d06fbc01b8) repeat top center;
  z-index: -1;
  -moz-animation: move-clouds-back 200s linear infinite;
  -ms-animatiom: move-clouds-back 200s linear infinite;
  -o-animation: move-clouds-back 200s linear infinite;
  -webkit-animation: move-clouds-back 200s linear infinite;
  animation: move-clouds-back 200s linear infinite;
}
</style>
