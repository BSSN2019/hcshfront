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
                  <a-input readOnly v-decorator="[ 'code', validatorRules.code]"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input readOnly v-decorator="[ 'name', validatorRules.name]" ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input readOnly v-decorator="[ 'category_dictText', validatorRules.category]"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="数据类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input readOnly v-decorator="[ 'valuetype_dictText', validatorRules.valuetype]" ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="高限" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input-number v-decorator="[ 'highlimit', validatorRules.highlimit]" style="width:100%"></a-input-number>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="低限" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input-number v-decorator="[ 'lowlimit', validatorRules.lowlimit]" style="width:100%"></a-input-number>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否启用" hasFeedback>
                  <a-switch checkedChildren="启用" unCheckedChildren="禁用" @change="onChose" v-model="visibleCheck"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-textarea v-decorator="['remark', validatorRules.remark]" rows="4" placeholder="请输入备注"/>
                </a-form-item>
              </a-col></a-row>
          </a-form>
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
    name: 'DivisionModal',
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
            labelCol2: { span: 3 },
            wrapperCol2: { span: 21 },
            confirmLoading: false,
            validatorRules: {
                id: { rules: [] },
                name: { rules: [] },
                category: { rules: [] },
                valuetype: { rules: [] },
                highlimit: { rules: [] },
                lowlimit: { rules: [] }
            },
            visibleCheck: true,
            enable: 1,
            url: {
                query: '/sys/parameter/station/query',
                edit: '/sys/parameter/station/edit'
            }
        }
    },
    created () {
    },
    methods: {
        edit (record) {
            this.form.resetFields()
            this.model = Object.assign({}, record)
            this.visible = true
            this.$nextTick(() => {
                this.form.setFieldsValue(pick(this.model, 'id', 'code', 'name', 'category_dictText', 'valuetype_dictText', 'highlimit', 'lowlimit', 'enable', 'remark'))
            })
            this.title = '监测参数'
            this.visibleCheck = (record.enable === 1)
        },
        close () {
            this.visible = false
            this.$emit('close')
        },
        handleOk () {
            const that = this
            // 触发表单验证
            this.form.validateFields((err, values) => {
                if (!err) {
                    that.confirmLoading = true
                    let httpurl = ''
                    let method = ''
                    httpurl += this.url.edit
                    method = 'put'
                    console.log(this.enable)
                    let formData = Object.assign(this.model, values)
                    formData.enable = this.enable
                    httpAction(httpurl, formData, method).then((res) => {
                        if (res.success) {
                            console.log(res.result)
                            that.$message.success(res.result)
                            that.$emit('ok')
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
        handleCancel () {
            this.close()
        },
        popupCallback (row) {
            this.form.setFieldsValue(pick(row, 'id', 'code', 'name', 'category_dictText', 'valuetype_dictText', 'highlimit', 'lowlimit'))
        },
        onChose (checked) {
            if (checked) {
                this.enable = 1
                this.visibleCheck = true
            } else {
                this.enable = 0
                this.visibleCheck = false
            }
        }
    }
}
</script>
<style scoped>
</style>
