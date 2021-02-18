<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form :form="form">
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="[ 'code', validatorRules.code]" placeholder="请输入编码"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入名称"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
<!--            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="热源类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <b-dict-select-tag type="list" v-decorator="['heatingsourcetype', validatorRules.heatingsourcetype]" :trigger-change="true" dictCode="heatingsourcetype" placeholder="请选择热源类型"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="额定供热能力" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input-number v-decorator="[ 'heatingcapacity', validatorRules.heatingcapacity]" placeholder="请输入额定供热能力" style="width: 100%"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="锅炉数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input-number v-decorator="[ 'boilernumber', validatorRules.boilernumber]" placeholder="请输入锅炉数量" style="width: 100%"/>
                </a-form-item>
              </a-col>
            </a-row>-->
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="负责人" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <b-dict-select-tag type="list" v-decorator="['leader', validatorRules.leader]" :trigger-change="true" dictCode="sys_user,realname,id" placeholder="请选择负责人"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item :labelCol="labelCol2" :wrapperCol="wrapperCol2" label="是否启用" hasFeedback>
                  <a-switch checkedChildren="启用" unCheckedChildren="禁用" @change="onChose" v-model="visibleCheck"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-textarea v-decorator="['remark', validatorRules.remark]" rows="4" placeholder="请输入备注"/>
                </a-form-item>
              </a-col></a-row></a-form>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>

import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash.pick'
import BDictSelectTag from '@/components/dict/BDictSelectTag'

export default {
    name: 'HeatingSourceModal',
    components: {
        BDictSelectTag
    },
    data () {
        return {
            form: this.$form.createForm(this),
            title: '操作',
            width: 800,
            visible: false,
            model: {},
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
            labelCol2: { span: 12 },
            wrapperCol2: { span: 12 },
            confirmLoading: false,
            validatorRules: {
                code: { rules: [ { required: true, message: '请输入编码!' } ] },
                name: { rules: [ { required: true, message: '请输入名称!' } ] },
                heatingsourcetype: { rules: [] },
                heatingcapacity: { rules: [] },
                boilernumber: { rules: [] },
                leader: { rules: [] },
                longitude: { rules: [] },
                latitude: { rules: [] },
                active: { rules: [] },
                remark: { rules: [] }
            },
            visibleCheck: true,
            status: 1,
            url: {
                add: '/basicdata/heatingsource/add',
                edit: '/basicdata/heatingsource/edit',
                config: '/sys/config/query',
                heatingOrg: '/basicdata/heatingorg/childList'
            },
            projectId: ''

        }
    },
    created () {
    },
    methods: {
        add (projectId) {
            this.projectId = projectId
            this.edit({})
        },
        edit (record) {
            this.form.resetFields()
            this.model = Object.assign({}, record)
            this.visible = true
            this.$nextTick(() => {
                this.form.setFieldsValue(pick(this.model, 'code', 'name', 'heatingsourcetype', 'heatingcapacity', 'boilernumber', 'leader', 'active', 'remark'))
            })
            if (this.model.id) {
                this.title = '编辑热源信息'
                this.visibleCheck = (record.active === 1)
                this.projectId = record.itemid
            } else {
                this.title = '新建热源信息'
                this.visibleCheck = true
            }
        },
        close () {
            this.$emit('close')
            this.visible = false
        },
        handleOk () {
            const that = this
            // 触发表单验证
            this.form.validateFields((err, values) => {
                if (!err) {
                    that.confirmLoading = true
                    let httpurl = ''
                    let method = ''
                    if (!this.model.id) {
                        httpurl += this.url.add
                        method = 'post'
                    } else {
                        httpurl += this.url.edit
                        method = 'put'
                    }
                    let formData = Object.assign(this.model, values)
                    formData.active = this.status
                    formData.heatingproject = this.projectId
                    httpAction(httpurl, formData, method).then((res) => {
                        if (res.success) {
                            that.$message.success(res.result.message)
                            that.submitSuccess(formData, res.result.heatingOrgId)
                        } else {
                            that.$message.warning(res.message)
                        }
                    }).finally(() => {
                        that.confirmLoading = false
                        that.close()
                    })
                }
            })
        },
        submitSuccess (formData, heatingOrgId) {
            // 此处的formData是HeatingProject的信息，需要根据这个信息获取到HeatingOrg的信息，同时将父节点展开
            getAction(this.url.heatingOrg, { id: heatingOrgId }).then((res) => {
                if (res.success) {
                    let returnInfo = Object.assign({}, res.result.records[0])
                    if (!formData.id) {
                        // 如果是新建
                        returnInfo.id = null
                        this.$emit('ok', returnInfo, res.result.records[0].pid)
                    } else {
                        this.$emit('ok', returnInfo, true)
                    }
                }
            })
        },
        onChose (checked) {
            if (checked) {
                this.status = 1
                this.visibleCheck = true
            } else {
                this.status = 0
                this.visibleCheck = false
            }
        },
        handleCancel () {
            this.close()
        },
        popupCallback (row) {
            this.form.setFieldsValue(pick(row, 'code', 'name', 'heatingsourcetype', 'heatingcapacity', 'boilernumber', 'leader', 'active', 'remark'))
        }
    }
}
</script>
<style scoped>
</style>
