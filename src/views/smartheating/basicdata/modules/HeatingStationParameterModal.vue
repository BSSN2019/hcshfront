<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="24">
          <div>
            <a-form-item label="监测参数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input readOnly v-if="this.model.id" v-model="this.parameterText"></a-input>
              <a-select v-else type="list" v-decorator="['parameter', validatorRules.parameter]" @change="handleParameterChange">
                <a-select-option v-for="(item) in this.parameterList" :key="item.id" :value="item.id">{{ item.text }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
          <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input readOnly v-decorator="[ 'type', validatorRules.type]"></a-input>
          </a-form-item>
          <a-form-item label="数据类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input readOnly v-decorator="[ 'valuetype', validatorRules.valuetype]"></a-input>
          </a-form-item>
          <a-form-item label="OPC符号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'opcitemid', validatorRules.opcitemid]"></a-input>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否启用" hasFeedback>
            <a-switch checkedChildren="启用" unCheckedChildren="禁用" @change="onChose" v-model="visibleCheck"/>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注" hasFeedback>
            <a-textarea v-decorator="['remark', validatorRules.remark]" rows="4" placeholder="请输入备注"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { httpAction, getAction } from '@/api/manage'

export default {
    name: 'HeatingStationParameterModal',
    components: {},
    data () {
        return {
            form: this.$form.createForm(this),
            title: '添加监测参数',
            width: 600,
            visible: false,
            model: {},
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
            confirmLoading: false,
            validatorRules: {
                parameter: { rules: [{ required: true, message: '请选择监测参数' }] },
                type: { rules: [] },
                valuetype: { rules: [] },
                opcitemid: { rules: [{ required: true, message: '请输入OPC符号' }] },
                remark: { rules: [] }
            },
            url: {
                add: '/sys/pointparameter/add',
                edit: '/sys/pointparameter/edit',
                addableParameters: '/basicdata/heatingstation/addableparameters',
                parameterInfo: '/sys/parameter/list'
            },
            parameterList: [],
            heatingStationId: '',
            parameterInfo: {},
            visibleCheck: true,
            active: 1,
            selectedParameter: '',
            parameterText: ''
        }
    },
    methods: {
        add (heatingStationId) {
            this.heatingStationId = heatingStationId
            this.edit({})
        },
        edit (record) {
            this.form.resetFields()
            this.model = Object.assign({}, record)
            this.visible = true
            if (this.model.id) {
                this.title = '编辑监测参数信息'
                this.active = this.model.active
                this.visibleCheck = (record.active === 1)
                this.heatingStationId = this.model.heatingstation
                this.parameterText = '(' + this.model.code + ')' + this.model.name
                this.$nextTick(() => {
                    this.form.setFieldsValue({
                        type: this.model.type_dictText,
                        valuetype: this.model.valuetype_dictText,
                        opcitemid: this.model.opcitemid
                    })
                })
            } else {
                this.title = '添加监测参数信息'
                this.active = 1
                this.visibleCheck = true
                this.$nextTick(() => {
                    this.loadParameterList()
                })
            }
        },
        loadParameterList () {
            getAction(this.url.addableParameters, { id: this.heatingStationId }).then(res => {
                if (res.success) {
                    this.parameterList = []
                    console.log(res.result)
                    for (let i = 0; i < res.result.length; i++) {
                        this.parameterList.push({ id: res.result[i].id, text: '(' + res.result[i].code + ')' + res.result[i].name })
                    }
                }
            })
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
                    formData.active = this.active
                    formData.heatingstation = this.heatingStationId
                    if (this.model.id == null) {
                        formData.parameter = this.selectedParameter
                    }
                    formData.remark = this.form.getFieldValue('remark')
                    httpAction(httpurl, formData, method).then((res) => {
                        if (res.success) {
                            that.$message.success(res.message)
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
        close () {
            this.visible = false
        },
        handleParameterChange (value) {
            this.selectedParameter = value
            getAction(this.url.parameterInfo, { id: value }).then(res => {
                if (res.success) {
                    this.form.setFieldsValue({
                        type: res.result.records[0].type_dictText,
                        valuetype: res.result.records[0].valuetype_dictText
                    })
                }
            })
        },
        onChose (checked) {
            if (checked) {
                this.active = 1
                this.visibleCheck = true
            } else {
                this.active = 0
                this.visibleCheck = false
            }
        }
    }
}
</script>

<style scoped>

</style>
