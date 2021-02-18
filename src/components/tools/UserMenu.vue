<template>
  <div class="user-wrapper" :class="theme">
    <span class="action">
      <b-clock></b-clock>
    </span>
    <header-notice class="action"/>
    <a-dropdown>
      <span class="action action-full ant-dropdown-link user-dropdown-menu">
        <span v-if="isDesktop()">欢迎您，{{ nickname() }}</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="4" @click="updatePassword">
          <a-icon type="setting"/>
          <span>密码修改</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <span class="action">
      <a class="logout_title" href="javascript:;" @click="handleLogout">
        <a-icon type="logout"/>
        <span v-if="isDesktop()">&nbsp;退出登录</span>
      </a>
    </span>
    <user-password ref="userPassword"></user-password>
  </div>
</template>

<script>
import HeaderNotice from './HeaderNotice'
import UserPassword from './UserPassword'
import { mapActions, mapGetters, mapState } from 'vuex'
import { mixinDevice } from '@/utils/mixin.js'
import { getFileAccessHttpUrl } from '@/api/manage'
import BClock from '../bssn/BClock'

export default {
    name: 'UserMenu',
    mixins: [mixinDevice],
    data () {
        return {
        }
    },
    components: {
        HeaderNotice,
        UserPassword,
        BClock
    },
    props: {
        theme: {
            type: String,
            required: false,
            default: 'dark'
        }
    },
    created () {
    },
    computed: {
    },
    watch: {
        device: {
            immediate: true,
            handler () {
            }
        }
    },
    methods: {
        ...mapActions(['Logout']),
        ...mapGetters(['nickname', 'avatar', 'userInfo']),
        getAvatar () {
            return getFileAccessHttpUrl(this.avatar())
        },
        handleLogout () {
            const that = this

            this.$confirm({
                title: '提示',
                content: '真的要注销登录吗 ?',
                onOk () {
                    return that.Logout({}).then(() => {
                        window.location.href = '/'
                    }).catch(err => {
                        that.$message.error({
                            title: '错误',
                            description: err.message
                        })
                    })
                },
                onCancel () {
                }
            })
        },
        updatePassword () {
            let username = this.userInfo().username
            this.$refs.userPassword.show(username)
        },
        filterOption (input, option) {
            return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        },
    }
}
</script>

<style lang="less" scoped>
  .user-wrapper .search-input {
    width: 180px;
    color: inherit;

    /deep/ .ant-select-selection {
      background-color: inherit;
      border: 0;
      border-bottom: 1px solid white;
      &__placeholder, &__field__placeholder {
        color: inherit;
      }
    }
  }
</style>

<style scoped>
  .logout_title {
    color: inherit;
    text-decoration: none;
  }
</style>
