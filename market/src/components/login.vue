<template>
    <div class="login" @keyup.enter="handleSubmit('loginForm')">
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
                <div class="form-item">
                    <Button class="login-btn" shape="circle" long @click="handleSubmit('loginForm')">登录</Button>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
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
        password: ''
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
    ...mapActions({add_Routes: 'add_Routes'}),
    // 登录表单验证
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let data = {
            username: this.$refs[name].model.username,
            password: this.$refs[name].model.password
          }
          // this.$api.login.login(JSON.stringify(data)).then((res) => {}).catch()
          if(data.username === 'admin' && data.password === '123'){
            this.$store.dispatch('setUserName', data.username).then(() => {
              this.$Message.info({
                content: '登录成功！',
                duration: 3
              })
              localStorage.setItem('Flag', 'isLogin')
              this.$router.push({name: 'home'})
            })
          } else {
            this.$Message.error('用户名或者密码错误')
          }
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
    right: 15%;
    top: 30%;
    z-index: 20;
    background: #ffffff;
    box-shadow: 0 4px 100px rgba(80, 80, 80, 0.15);
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px 40px;
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
</style>
