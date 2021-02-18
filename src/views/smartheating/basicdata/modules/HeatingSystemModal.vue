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
            <a-row v-if="this.heatingSourceId !== null" :gutter="24">
              <a-col :span="24">
                <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <b-dict-select-tag type="list" v-decorator="['typesource', validatorRules.typesource]" :trigger-change="true" dictCode="systemtypesource" placeholder="请选择类型"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row v-if="this.heatingStationId !== null" :gutter="24">
              <a-col :span="24">
                <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <b-dict-select-tag type="list" v-decorator="['typestation', validatorRules.typestation]" :trigger-change="true" dictCode="systemtypestation" placeholder="请选择类型"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row v-if="this.heatingStationId !== null" :gutter="24">
              <a-col :span="24">
                <a-form-item label="供热面积" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input-number v-decorator="[ 'heatingarea', validatorRules.heatingarea]" placeholder="请输入供热面积" style="width: 100%"/>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row v-if="this.heatingStationId !== null" :gutter="24">
              <a-col :span="24">
                <a-form-item label="控制方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <b-dict-select-tag type="list" v-decorator="['controltype', validatorRules.controltype]" :trigger-change="true" dictCode="heatingstation_controltype" placeholder="请选择控制方式"/>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="数据源DeviceId" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="[ 'dsdeviceid', validatorRules.dsdeviceid]" placeholder="请输入数据源DeviceId"></a-input>
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
    name: 'HeatingSystemModal',
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
                dsdeviceid: {},
                typesource: { rules: [] },
                typesystem: { rules: [] },
                heatingarea: { rules: [] },
                controltype: {rules:[]},
                active: { rules: [] },
                remark: { rules: [] }
            },
            visibleCheck: true,
            status: 1,
            url: {
                add: '/basicdata/heatingsystem/add',
                edit: '/basicdata/heatingsystem/edit',
                config: '/sys/config/query',
                heatingOrg: '/basicdata/heatingorg/childList'
            },
            heatingSourceId: '',
            heatingStationId: ''
        }
    },
    created () {
    },
    methods: {
        add (record) {
            if (record.type === 3) {
                this.heatingSourceId = record.itemid
                this.heatingStationId = null
            }
            if (record.type === 4) {
                this.heatingSourceId = null
                this.heatingStationId = record.itemid
            }
            this.edit({})
        },
        edit (record) {
            this.form.resetFields()
            this.model = Object.assign({}, record)
            console.log(this.model)
            this.visible = true
            this.$nextTick(() => {
                this.form.setFieldsValue(pick(this.model, 'code', 'name', 'typesource', 'typesource_dictText', 'typestation', 'typestation_dictText', 'heatingarea', 'heatingsource', 'heatingstation', 'active', 'remark', 'dsdeviceid','controltype'))
            })
            if (this.model.id) {
                this.title = '编辑供热系统信息'
                this.visibleCheck = (record.active === 1)
                this.heatingSourceId = record.heatingsource
                this.heatingStationId = record.heatingstation
            } else {
                this.title = '新建供热系统信息'
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
                    formData.heatingsource = this.heatingSourceId
                    formData.heatingstation = this.heatingStationId
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
            // 此处的formData是HeatingSystem的信息，需要根据这个信息获取到HeatingOrg的信息
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
            this.form.setFieldsValue(pick(row,  'code', 'name', 'typesource', 'typesource_dictText', 'typestation', 'typestation_dictText', 'heatingarea', 'heatingsource', 'heatingstation', 'active', 'remark', 'dsdeviceid','controltype' ))
        }
    }
}
</script>
<style scoped>
  .serachinput{
    width: 300px;
    box-sizing: border-box;
    padding: 9px;
    border: 1px solid #dddee1;
    line-height: 20px;
    font-size: 16px;
    height: 38px;
    color: #333;
    position: relative;
    border-radius: 4px;
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
  }
</style>
