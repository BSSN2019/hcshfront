<template>
    <div :style="{backgroundImage:`url(${bgimage})`}">
    <a-card>
      <br><br>
      <a-form :form="form" class="user-layout-login" ref="formLogin" id="formLogin">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['username',validatorRules.username,{ validator: this.handleUsernameOrEmail }]"
            type="text"
            placeholder="请输入帐户名">
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            v-decorator="['password',validatorRules.password]"
            size="large"
            type="password"
            autocomplete="false"
            placeholder="密码">
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>

        <a-row :gutter="0">
          <a-col :span="16">
            <a-form-item>
              <a-input
                v-decorator="['inputCode',validatorRules.inputCode]"
                size="large"
                type="text"
                @change="inputCodeChange"
                placeholder="请输入验证码">
                <a-icon slot="prefix" type="smile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align: right">
            <img v-if="requestCodeSuccess" style="margin-top: 2px;" :src="randCodeImage" @click="handleChangeCheckCode"/>
            <img v-else style="margin-top: 2px;" src="../../assets/checkcode.png" @click="handleChangeCheckCode"/>
          </a-col>
        </a-row>
        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="loginBtn"
            @click.stop.prevent="handleSubmit"
            :disabled="loginBtn">确定
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
// import md5 from "md5"
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import Vue from 'vue'
import { ACCESS_TOKEN, ENCRYPTED_STRING, USER_INFO } from '@/store/mutation-types'
import { putAction, postAction, getAction } from '@/api/manage'
import { encryption, getEncryptedString } from '@/utils/encryption/aesEncrypt'
import store from '@/store/'

export default {
    components: {
    },
    data () {
        return {
            bgImage: 'url(' + require('../../assets/bg.png') + ')',
            customActiveKey: 'tab1',
            loginBtn: false,
            loginType: 0,
            requiredTwoStepCaptcha: false,
            stepCaptchaVisible: false,
            form: this.$form.createForm(this),
            encryptedString: {
                key: '',
                iv: ''
            },
            state: {
                time: 60,
                smsSendBtn: false
            },
            validatorRules: {
                username: { rules: [{ required: true, message: '请输入用户名!' }, { validator: this.handleUsernameOrEmail }] },
                password: { rules: [{ required: true, message: '请输入密码!', validator: 'click' }] },
                mobile: { rules: [{ validator: this.validateMobile }] },
                captcha: { rule: [{ required: true, message: '请输入验证码!' }] },
                inputCode: { rules: [{ required: true, message: '请输入验证码!' }] }
            },
            verifiedCode: '',
            inputCodeContent: '',
            inputCodeNull: true,

            departList: [],
            departVisible: false,
            departSelected: '',
            currentUsername: '',
            validate_status: '',
            currdatetime: '',
            randCodeImage: '',
            requestCodeSuccess: false,
            realname: '',
            url: {
                getrealname: '/sys/user/getrealname'
            }
        }
    },
    created () {
        this.currdatetime = new Date().getTime()
        Vue.ls.remove(ACCESS_TOKEN)
        this.getRouterData()
        this.handleChangeCheckCode()
        // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
        // this.getEncrypte();
        // update-end- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
    },
    methods: {
        ...mapActions([ 'Login', 'Logout', 'PhoneLogin' ]),
        // handler
        handleUsernameOrEmail (rule, value, callback) {
            const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
            if (regex.test(value)) {
                this.loginType = 0
            } else {
                this.loginType = 1
            }
            callback()
        },
        handleSubmit () {
            let that = this
            let loginParams = {}
            that.loginBtn = true
            // 使用账户密码登陆
            if (that.customActiveKey === 'tab1') {
                that.form.validateFields([ 'username', 'password', 'inputCode', 'rememberMe' ], { force: true }, (err, values) => {
                    if (!err) {
                        loginParams.username = values.username
                        loginParams.password = values.password
                        loginParams.remember_me = values.rememberMe
                        loginParams.captcha = that.inputCodeContent
                        loginParams.checkKey = that.currdatetime
                        console.log('登录参数', loginParams)
                        that.Login(loginParams).then((res) => {
                            this.loginSuccess()
                        }).catch((err) => {
                            that.requestFailed(err)
                        })
                    } else {
                        that.loginBtn = false
                    }
                })
            }
        },

        handleChangeCheckCode () {
            this.currdatetime = new Date().getTime()
            getAction(`/sys/randomImage/${this.currdatetime}`).then(res => {
                if (res.success) {
                    this.randCodeImage = res.result
                    this.requestCodeSuccess = true
                } else {
                    this.$message.error(res.message)
                    this.requestCodeSuccess = false
                }
            }).catch(() => {
                this.requestCodeSuccess = false
            })
        },
        loginSuccess () {
            getAction('/sys/user/getrealname').then(res => {
                if (res.success) {
                    this.realname = res.result
                    this.$router.push({ name: 'dashboard' })
                    this.$notification.success({
                        message: '欢迎',
                        description: this.realname + '，' + `${timeFix()}，欢迎回来`
                    })
                } else {
                    this.$message.warning(res.message)
                }
            })
        },
        requestFailed (err) {
            this.$notification[ 'error' ]({
                message: '登录失败',
                description: ((err.response || {}).data || {}).message || err.message || '请求出现错误，请稍后再试',
                duration: 4
            })
            this.loginBtn = false
        },
        validateInputCode (rule, value, callback) {
            if (!value || this.verifiedCode == this.inputCodeContent) {
                callback()
            } else {
                callback('您输入的验证码不正确!')
            }
        },
        generateCode (value) {
            this.verifiedCode = value.toLowerCase()
        },
        inputCodeChange (e) {
            this.inputCodeContent = e.target.value
        },
        departConfirm (res) {
            if (res.success) {
                let multi_depart = res.result.multi_depart
                // 0:无部门 1:一个部门 2:多个部门
                if (multi_depart == 0) {
                    this.loginSuccess()
                    this.$notification.warn({
                        message: '提示',
                        description: `您尚未归属部门,请确认账号信息`,
                        duration: 3
                    })
                } else if (multi_depart == 2) {
                    this.departVisible = true
                    this.currentUsername = this.form.getFieldValue('username')
                    this.departList = res.result.departs
                } else {
                    this.loginSuccess()
                }
            } else {
                this.requestFailed(res)
                this.Logout()
            }
        },
        departOk () {
            if (!this.departSelected) {
                this.validate_status = 'error'
                return false
            }
            let obj = {
                orgCode: this.departSelected,
                username: this.form.getFieldValue('username')
            }
            putAction('/sys/selectDepart', obj).then(res => {
                if (res.success) {
                    const userInfo = res.result.userInfo
                    Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
                    store.commit('SET_INFO', userInfo)
                    // console.log("---切换组织机构---userInfo-------",store.getters.userInfo.orgCode);
                    this.departClear()
                    this.loginSuccess()
                } else {
                    this.requestFailed(res)
                    this.Logout().then(() => {
                        this.departClear()
                    })
                }
            })
        },
        departClear () {
            this.departList = []
            this.departSelected = ''
            this.currentUsername = ''
            this.departVisible = false
            this.validate_status = ''
        },
        departChange (value) {
            this.validate_status = 'success'
            this.departSelected = value
        },
        getRouterData () {
            this.$nextTick(() => {
                if (this.$route.params.username) {
                    this.form.setFieldsValue({
                        'username': this.$route.params.username
                    })
                }
            })
        },
        // 获取密码加密规则
        getEncrypte () {
            var encryptedString = Vue.ls.get(ENCRYPTED_STRING)
            if (encryptedString == null) {
                getEncryptedString().then((data) => {
                    this.encryptedString = data
                })
            } else {
                this.encryptedString = encryptedString
            }
        }
    }
}
</script>

<style lang="less" scoped>

  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0,0,0,.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color .3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }

</style>
<style>
  .valid-error .ant-select-selection__placeholder{
    color: #f5222d;
  }

</style>
