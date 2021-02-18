<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item v-if="this.isEdit" :labelCol="labelCol" :wrapperCol="wrapperCol" label="名称">
          <a-input readOnly v-model="this.model.project_dictText"></a-input>
        </a-form-item>
        <a-form-item v-else :labelCol="labelCol" :wrapperCol="wrapperCol" label="名称" >
          <a-select v-model="projectId" placeholder="请选择项目">
            <a-select-option :value="undefined">请选择</a-select-option>
            <a-select-option v-for="(item) in assignableProjectList" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否启用" hasFeedback>
              <a-switch checkedChildren="是" unCheckedChildren="否" @change="onChose" v-model="visibleCheck"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { httpAction, getAction } from '@/api/manage'

export default {
    name: 'ChargePeriodModal',
    components: {
    },
    data () {
        return {
            title: '操作',
            visible: false,
            fldActive: true,
            fldIsCurrentPeriod: true,
            model: {},
            userId: '',
            projectId: '',
            visibleCheck: true,
            status: 1,
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 12
            },
            labelCol2: {
                span: 4
            },
            wrapperCol2: {
                span: 20
            },
            confirmLoading: false,
            form: this.$form.createForm(this),
            validatorRules: {
                name: { rules: [{ required: true, message: '请输入名称!' }] }
            },
            url: {
                add: '/basicdata/heatingprojectuser/add',
                edit: '/basicdata/heatingprojectuser/edit',
                assignableProject: '/basicdata/heatingproject/queryAssignableProjects'
            },
            assignableProjectList: [],
            isEdit: true
        }
    },
    methods: {
        add (userId) {
            this.userId = userId
            this.isEdit = false
            this.projectId = null
            this.edit({userid: userId})
        },
        edit (record) {
            console.log(record)
            if (record.id) {
                this.model = Object.assign({}, record)
                this.isEdit = true
            } else {
                this.isEdit = false
                this.userId = record.userid
                this.assignableProjectList = []
                getAction(this.url.assignableProject, { userId: this.userId }).then(res => {
                    if (res.success) {
                        for (let i = 0; i < res.result.length; i++) {
                            this.assignableProjectList.push({
                                id: res.result[i].id,
                                name: res.result[i].name
                            })
                        }
                    }
                })
            }
            console.log(this.isEdit)
            this.form.resetFields()
            this.visible = true
        },
        // 确定
        handleOk () {
            const that = this
            // 触发表单验证
            this.form.validateFields((err, values) => {
                if (!err) {
                    that.confirmLoading = true
                    let formData = {
                        id: this.model.id,
                        user: this.userId,
                        project: this.projectId,
                        control: this.status
                    }
                    console.log(formData)
                    let url = this.url.add
                    let method = 'post'
                    if (this.model.id) {
                        url = this.url.edit
                        method = 'put'
                    }
                    this.confirmLoading = true
                    httpAction(url, formData, method).then((res) => {
                        if (res.success) {
                            this.$message.success(res.message)
                            this.$emit('ok')
                            this.close()
                        } else {
                            this.$message.warning(res.message)
                        }
                    }).finally(() => {
                        this.confirmLoading = false
                    })
                }
            })
        },
        // 关闭
        handleCancel () {
            this.close()
        },
        close () {
            this.$emit('close')
            this.visible = false
        },
        onChose (checked) {
            if (checked) {
                this.status = 1
                this.visibleCheck = true
            } else {
                this.status = 0
                this.visibleCheck = false
            }
        }

    }
}
</script>
